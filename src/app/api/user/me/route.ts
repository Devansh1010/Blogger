
import { getUserProfile } from '@/domains/user/services/profile.services'
import { Badges } from '@/domains/user/type'
import { createResponse, StatusCode } from '@/lib/createResponse'
import { dbConnect } from '@/lib/db'
import { VerifyUser } from '@/lib/verifyUser/userVerification'
import User from '@/models/user_models/user.model'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url)

  const userId = searchParams.get('userId')

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ??
    "unknown";

  if (!userId) {
    return createResponse({
      success: false,
      message: 'User id is required'
    }, StatusCode.BAD_REQUEST)
  }

  return await getUserProfile({ userId, ip })
}

export async function PATCH(req: NextRequest) {

  try {

    const auth = await VerifyUser();

    if (!auth.success || !auth.user?._id) {
      return createResponse(
        { success: false, message: "Unauthorized" },
        StatusCode.UNAUTHORIZED
      );
    }

    const userId = auth.user._id;

    await dbConnect()

    const body = await req.json()

    // If client is updating selectedBadges
    if (body.selectedBadges) {
      const selectedBadges = body.selectedBadges

      if (!Array.isArray(selectedBadges)) {
        return createResponse({
          success: false,
          message: 'selectedBadges must be an array'
        }, StatusCode.BAD_REQUEST)
      }

      if (selectedBadges.length > 3) {
        return createResponse({
          success: false,
          message: 'You can select up to 3 badges'
        }, StatusCode.BAD_REQUEST)
      }

      const user = await User.findById(userId).select('badges').lean();

      if (!user) {
        return createResponse({
          success: false,
          message: 'User not found'
        }, StatusCode.NOT_FOUND)
      }

      const ownedBadgeIds = (user.badges || []).map((b: Badges) => b.id)

      for (const bid of selectedBadges) {
        if (!ownedBadgeIds.includes(bid)) {
          return createResponse({
            success: false,
            message: `Badge ${bid} not owned by user`
          }, StatusCode.BAD_REQUEST)
        }
      }

      await User.updateOne(
        { _id: userId },
        {
          $set: { selectedBadges }
        })

      return createResponse({ 
        success: true, 
        message: 'Selected badges updated' 
      }, StatusCode.OK)
    }

    const { email, username, profileImage, coverImage } = body

    //validate the data

    const updatedUser = await User.findByIdAndUpdate(userId,
      {
        email,
        username,
        coverImage: coverImage.url,
        avatar: profileImage.url
      }
    )

    if (!updatedUser) {
      return createResponse(
        { success: false, message: "Not Fouond" },
        StatusCode.NOT_FOUND
      );
    }

    // await valkey.del(`user_profile_${userId}`)

    return createResponse(
      { success: true, message: "Updated Successfully" },
      StatusCode.OK
    );

  } catch (error) {
    console.error('Error Updating User Details:', error)
    return createResponse(
      {
        success: false,
        message: 'Error Updating User Details',
        error: {
          code: '500',
          message: 'Internal Server Error',
        },
      },
      StatusCode.INTERNAL_ERROR
    )
  }
}