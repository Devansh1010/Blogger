import { userApi } from './user.axios'

export const getUserBadges = async (userId: string) => {
  if (!userId) return []

  const res = await userApi.get(`/me?userId=${userId}`)

  // The /me endpoint returns data.data.userProfile which contains badges
  return res.data?.data?.userProfile?.badges ?? []
}
