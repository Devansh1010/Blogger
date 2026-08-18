'use client'

import Image from 'next/image'
import useGetUserBadges from '@/domains/user/hooks/badges/useGetUserBadges'
import { Badges } from '@/domains/user/type'

const UserBadges = ({ userId }: { userId: string }) => {
  const { data: badges = [], isLoading } = useGetUserBadges(userId)

  if (isLoading) return <div className="mt-4 text-sm text-muted-foreground">Loading badges...</div>

  if (!badges || badges.length === 0) {
    return <div className="mt-4 text-sm text-muted-foreground">No badges earned yet</div>
  }

  return (
    <div className="mt-4">
      <h3 className="mb-2 text-sm font-semibold text-muted-foreground">All Badges</h3>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {badges.map((b: Badges) => (
          <div key={b.id} className="flex flex-col items-center gap-2">
            <div
              className="relative flex h-14 w-14 items-center justify-center rounded-full border border-border/60 bg-muted/30"
              style={b.color ? { boxShadow: `0 0 0 4px ${b.color}33` } : undefined}
            >
              <Image src={b.icon} alt={b.name} width={56} height={56} className="h-12 w-12 object-contain" />
            </div>
            <div className="text-center text-xs font-medium">{b.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserBadges
