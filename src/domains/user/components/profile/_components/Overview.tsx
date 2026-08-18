import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useGetUserProfile } from '@/domains/user/hooks/profile/useGetProfile'
import OverviewLoader from '../loader/OverviewLoader'
import ProfileError from '../error/ProfileError'
import EditProfile from '../EditProfile'
import CoverImage from './CoverImage'
import { Badges } from '@/domains/user/type'
import Image from 'next/image'
import ResetPassword from './ResetPassword'
import React from 'react'
import UserBadges from './UserBadges'

const Overview = ({ userId }: { userId: string }) => {
    const {
        userData,
        isPending,
        isError,
        refetch
    } = useGetUserProfile(userId)

    if (isPending) return <OverviewLoader />
    if (isError) return <ProfileError refetch={refetch} />

    const profile = userData?.userProfile

    const selectedBadges =
        (profile?.badges ?? []).filter((badge: Badges) =>
            (profile?.selectedBadges ?? []).includes(badge.id)
        )

    return (
        <section className="relative pb-4">
            <CoverImage userId={userId} />

            <div className="mx-auto max-w-5xl px-6">
                <div className="relative -mt-14">
                    <div className="rounded-[30px] border border-border/70 bg-background/80 p-5 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-6">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                            <div className="flex items-end gap-4">
                                <Avatar className="h-28 w-28 border-4 border-background shadow-lg sm:h-32 sm:w-32">
                                    <AvatarImage
                                        src={profile?.avatar ?? ""}
                                        alt={profile?.username ?? "Profile"}
                                    />

                                    <AvatarFallback className="text-3xl font-semibold">
                                        {profile?.username?.[0]?.toUpperCase() ?? "U"}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="pb-2">
                                    <p className="mb-2 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                                        Creator profile
                                    </p>
                                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                        {profile?.username}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                {userData?.isOwner ? (
                                    <>
                                        <EditProfile userId={userId} />
                                        <ResetPassword />
                                    </>
                                ) : (
                                    <Button size="sm" className="rounded-lg px-5 font-medium">
                                        Follow
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="mt-5">
                            {selectedBadges.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {selectedBadges.map((badge: Badges) => (
                                        <div
                                            key={badge.id}
                                            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1.5 transition-colors hover:bg-muted"
                                        >
                                            <Image
                                                src={badge.icon}
                                                alt={badge.name}
                                                width={24}
                                                height={24}
                                                className="h-6 w-6 object-contain"
                                            />

                                            <span className="text-sm font-medium">
                                                {badge.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Showcase all user badges (new component) */}
                            <div>
                                <UserBadges userId={userId} />
                            </div>
                        </div>

                        <div className="mt-6 grid gap-3 border-t border-border/70 pt-5 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-2xl border border-border/60 bg-muted/40 px-4 py-3">
                                <div className="text-xl font-bold text-foreground">
                                    {profile?.followers ?? 0}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Followers
                                </div>
                            </div>

                            <div className="rounded-2xl border border-border/60 bg-muted/40 px-4 py-3">
                                <div className="text-xl font-bold text-foreground">
                                    {userData?.articleCount ?? 0}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Articles
                                </div>
                            </div>

                            <div className="rounded-2xl border border-border/60 bg-muted/40 px-4 py-3">
                                <div className="text-xl font-bold text-foreground">
                                    {userData?.seriesCount ?? 0}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Series
                                </div>
                            </div>

                            <div className="rounded-2xl border border-border/60 bg-muted/40 px-4 py-3">
                                <div className="text-xl font-bold text-foreground">
                                    {userData?.totalViews ?? 0}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Views
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Overview