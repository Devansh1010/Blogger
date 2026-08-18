import badgeService from '@/domains/badges/utils/badgeService'
import { createResponse, StatusCode } from '@/lib/createResponse'
import { dbConnect } from '@/lib/db'
import { NextRequest } from 'next/server'

// Secure this endpoint by requiring an ADMIN_SECRET header. Set process.env.ADMIN_SECRET
// in the deployment environment. This keeps the awarding flow separate from sign-up.

export async function POST(req: NextRequest) {
  try {
    const adminSecret = req.headers.get('x-admin-secret')
    if (!process.env.ADMIN_SECRET || adminSecret !== process.env.ADMIN_SECRET) {
      return createResponse({ success: false, message: 'Forbidden' }, StatusCode.FORBIDDEN)
    }

    const body = await req.json().catch(() => ({}))
    const limit = typeof body.limit === 'number' ? body.limit : 100

    await dbConnect()

    const res = await badgeService.awardFoundingMembers(limit)

    if (!res.success) {
      return createResponse({ success: false, message: res.message ?? 'Error Occured' }, StatusCode.INTERNAL_ERROR)
    }

    return createResponse({ success: true, message: 'Found badges', data: res.results }, StatusCode.OK)
  } catch (error) {
    console.error('Error awarding founding members', error)
    return createResponse({ success: false, message: 'Internal Server Error' }, StatusCode.INTERNAL_ERROR)
  }
}
