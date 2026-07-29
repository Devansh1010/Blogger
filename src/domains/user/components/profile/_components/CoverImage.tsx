import { useGetUserProfile } from '@/domains/user/hooks/profile/useGetProfile'
import Image from 'next/image'
import React from 'react'
import OverviewLoader from '../loader/OverviewLoader'
import ProfileError from '../error/ProfileError'

const CoverImage = ({ userId }: { userId: string }) => {
    const {
        userData,
        isPending,
        isError,
        refetch
    } = useGetUserProfile(userId)

    if (isPending) return <OverviewLoader />
    if (isError) return <ProfileError refetch={refetch} />
    return (
        <div className="relative h-56 overflow-hidden rounded-xl bg-linear-to-r from-slate-800 via-slate-700 to-slate-900">
            {userData?.userProfile ? (
                <Image
                    src={userData.userProfile.coverImage}
                    alt="Cover Image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                />
            ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    No cover image
                </div>
            )}
        </div>
    )
}

export default CoverImage