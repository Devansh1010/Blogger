import { dbConnect } from '@/lib/db'
import User from '@/models/user_models/user.model'
import { findBadgeById } from '../constants'

/**
 * Centralized badge service for awarding badges and enforcing rules like uniqueness
 * and max award counts. Designed to be used by admin endpoints or background jobs.
 */

export async function awardBadgeToUser(userId: string, badgeId: string) {
  await dbConnect()

  const badge = findBadgeById(badgeId)
  
  if (!badge) {
    return { success: false, message: 'Badge not found' }
  }

  // If badge has a maxAwards limit, ensure it is not exceeded
  if (typeof badge.maxAwards === 'number') {
    const count = await User.countDocuments({ 'badges.id': badgeId })
    if (count >= badge.maxAwards) {
      return { success: false, message: 'Badge award limit reached' }
    }
  }

  // Use $addToSet so we don't add duplicates; set awardedAt to now for new award
  const update = await User.updateOne(
    { _id: userId, 'badges.id': { $ne: badgeId } },
    {
      $addToSet: {
        badges: {
          id: badge.id,
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
          awardedAt: new Date(),
        },
      },
    }
  )

  if (update.modifiedCount === 0) {
    // Could be because user already has badge or user not found
    const userHas = await User.findOne({ _id: userId, 'badges.id': badgeId }).lean()
    if (userHas) {
      return { success: false, message: 'User already has badge' }
    }
    return { success: false, message: 'User not found or not updated' }
  }

  return { success: true }
}

/**
 * Award "founding-member" badge to the first N users by creation time.
 * This is idempotent and enforces badge.maxAwards if specified.
 */
export async function awardFoundingMembers(limit = 100) {
  await dbConnect()

  const badge = findBadgeById('founding-member')
  if (!badge) {
    return { success: false, message: 'Founding member badge not defined' }
  }

  // If badge defines maxAwards, respect the smaller of the two
  const max = typeof badge.maxAwards === 'number' ? Math.min(limit, badge.maxAwards) : limit

  // Find users ordered by createdAt ascending (earliest first)
  const users = await User.find().sort({ createdAt: 1 }).limit(max).select('_id badges createdAt').lean()

  const results: { userId: string, awarded: boolean, reason?: string }[] = []

  for (const u of users) {
    const already = (u.badges || []).some(b => b.id === badge.id)
    if (already) {
      results.push({ userId: String(u._id), awarded: false, reason: 'already_has' })
      continue
    }

    const res = await User.updateOne(
      { _id: u._id, 'badges.id': { $ne: badge.id } },
      { $addToSet: { badges: { id: badge.id, name: badge.name, description: badge.description, icon: badge.icon, awardedAt: new Date() } } }
    )

    if (res.modifiedCount > 0) {
      results.push({ userId: String(u._id), awarded: true })
    } else {
      results.push({ userId: String(u._id), awarded: false, reason: 'update_failed' })
    }
  }

  return { success: true, results }
}

export default {
  awardBadgeToUser,
  awardFoundingMembers,
}
