import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useGetUserProfile } from '@/domains/user/hooks/profile/useGetProfile'
import React from 'react'
import OverviewLoader from '../loader/OverviewLoader'

const Overview = ({ userId }: { userId: string }) => {
    const {
        userData,
        isPending,
        // isError
    } = useGetUserProfile(userId)

    if (isPending) return <OverviewLoader />

    return (
        <section className="relative">
            {/* Cover */}
            <div className="relative h-56 overflow-hidden rounded-xl bg-linear-to-r from-slate-800 via-slate-700 to-slate-900">
                {/* Later replace with user's cover image */}
            </div>

            {/* Profile */}
            <div className="-mt-16 flex flex-col items-center">
                <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                    <AvatarImage src={userData?.userProfile?.avatar ?? ""} />

                    <AvatarFallback className="text-4xl font-semibold">
                        {userData?.userProfile?.username[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="mt-4 text-center">
                    <h1 className="text-3xl font-bold">
                        {userData?.userProfile?.username}
                    </h1>

                    {/* Optional tagline */}
                    <p className="mt-3 max-w-xl text-muted-foreground">
                        Software Engineer • Technical Writer
                    </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-sm">
                    <div>
                        <span className="font-semibold">
                            {userData?.userProfile?.followers}
                        </span>{" "}
                        Followers
                    </div>

                    <div>
                        <span className="font-semibold">
                            {userData?.articleCount ?? 0}
                        </span>{" "}
                        Articles
                    </div>

                    <div>
                        <span className="font-semibold">
                            {userData?.seriesCount ?? 0}
                        </span>{" "}
                        Series
                    </div>

                    <div className="text-muted-foreground">
                        Joined July 2026
                    </div>
                </div>

                <Button className="mt-6">
                    Follow
                </Button>
            </div>
        </section>
    )
}

export default Overview