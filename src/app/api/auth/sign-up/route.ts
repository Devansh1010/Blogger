import bcrypt from 'bcryptjs'
import { dbConnect } from '@/lib/db'
import User from '@/models/user_models/user.model'
import { createResponse, StatusCode } from '@/lib/createResponse'
import { sendVerification } from '@/helpers/sendVerificationEmail'

export async function POST(request: Request) {
  await dbConnect()
  
  try {
    const { username, email, password } = await request.json()

    const existingUserVerifiedByUsername = await User.findOne({
      username,
      isVerified: true,
    })

    if (existingUserVerifiedByUsername) {
      return createResponse(
        {
          success: false,
          message: 'Username is already taken',
        },
        StatusCode.BAD_REQUEST
      )
    }

    if (!username || !email || !password) {
      return createResponse(
        {
          success: false,
          message: 'missing fields',
        },
        StatusCode.UNAUTHORIZED
      )
    }

    const existingUserByEmail = await User.findOne({ email })

    const verifyCode = Math.floor(10000 + Math.random() * 90000).toString()

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return createResponse(
          {
            success: false,
            message: 'User is verified',
          },
          StatusCode.FORBIDDEN
        )
      } else {
        const hashedPassword = await bcrypt.hash(password, 10)

        const updatedAdminDetails = await User.findOneAndUpdate(
          { email },
          {
            username,
            password: hashedPassword,
            provider: "credentials",
            verifyCode,
            verifyExpiry: new Date(Date.now() + 3600000),
          },
          { new: true, runValidators: false }
        )

        if (!updatedAdminDetails)
          return createResponse(
            {
              success: false,
              message: 'User not updated',
            },
            StatusCode.CONFLICT
          )

        const emailResponce = await sendVerification(email, username, verifyCode)

        if (!emailResponce.success) {
          return createResponse(
            {
              success: false,
              message: emailResponce.message,
            },
            StatusCode.INTERNAL_ERROR
          )
        }

        return createResponse(
          {
            success: true,
            message: 'Verify Code sent! Please Verify',
          },
          StatusCode.OK
        )
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)

      const expiryDate = new Date()
      expiryDate.setHours(expiryDate.getHours() + 1)

      const createdUser = await User.create({
        username,
        email,
        password: hashedPassword,
        provider: "credentials",
        verifyCode,
        verifyExpiry: expiryDate,
        isVerified: false,
      })

      // Award "Founding Member" badge to first 100 users
      try {
        const userCount = await User.countDocuments()
        if (userCount <= 100) {
          const { findBadgeById } = await import('@/domains/user/constants')
          const badge = findBadgeById('founding-member')
          if (badge) {
            await User.updateOne({ _id: createdUser._id }, { $addToSet: { badges: { id: badge.id, name: badge.name, description: badge.description, icon: badge.icon, awardedAt: new Date() } } })
          }
        }
      } catch (e) {
        console.warn('Badge assignment failed', e)
      }

      const emailResponce = await sendVerification(email, username, verifyCode)

      if (!emailResponce.success) {
        return createResponse(
          {
            success: false,
            message: emailResponce.message,
          },
          StatusCode.INTERNAL_ERROR
        )
      }

      return createResponse(
        {
          success: true,
          message: 'Verify Code sent! Please Verify',
        },
        StatusCode.OK
      )
    }
  } catch (error) {
    console.log('Error registering user', error)
    return createResponse(
      {
        success: false,
        message: 'Error while registering user',
      },
      StatusCode.INTERNAL_ERROR
    )
  }
}