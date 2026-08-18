'use client'

import { useQuery } from '@tanstack/react-query'
import { getUserBadges } from '@/domains/user/axios/badges.axios'

export const useGetUserBadges = (userId: string) => {
  return useQuery(['user','badges', userId], () => getUserBadges(userId), {
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export default useGetUserBadges
