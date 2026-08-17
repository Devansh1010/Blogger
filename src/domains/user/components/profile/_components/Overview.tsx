import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useGetUserProfile } from '@/domains/user/hooks/profile/useGetProfile'
import OverviewLoader from '../loader/OverviewLoader'
import ProfileError from '../error/ProfileError'
import EditProfile from '../EditProfile'
import CoverImage from './CoverImage'
import { Badges } from '@/domains/user/type'
import Image from 'next/image'

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
        <section className="relative">
            {/* Cover */}
            <CoverImage userId={userId} />

            {/* Profile Content */}
            <div className="mx-auto max-w-5xl px-6">
                <div className="relative -mt-14">

                    {/* Avatar + Actions */}
                    <div className="flex items-end justify-between">
                        <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                            <AvatarImage
                                src={profile?.avatar ?? ""}
                                alt={profile?.username ?? "Profile"}
                            />

                            <AvatarFallback className="text-3xl font-semibold">
                                {profile?.username?.[0]?.toUpperCase() ?? "U"}
                            </AvatarFallback>
                        </Avatar>

                        {/* Action */}
                        <div className="mb-1">
                            {userData?.isOwner ? (
                                <EditProfile userId={userId} />
                            ) : (
                                <Button size="sm">
                                    Follow
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Identity */}
                    <div className="mt-4">

                        {/* Username */}
                        <h1 className="text-3xl font-bold tracking-tight">
                            {profile?.username}
                        </h1>

                        {/* Badges */}
                        {selectedBadges.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {selectedBadges.map((badge: Badges) => (
                                    <div
                                        key={badge.id}
                                        className="
                                    inline-flex items-center gap-2
                                    rounded-full
                                    border
                                    bg-muted/50
                                    px-3 py-1.5
                                    transition-colors
                                    hover:bg-muted
                                "
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

                    </div>

                    {/* Stats */}
                    <div
                        className="
                    mt-6
                    flex flex-wrap
                    items-center
                    gap-x-8 gap-y-3
                    border-t
                    pt-5
                "
                    >
                        <div className="flex items-center gap-1.5">
                            <span className="font-semibold">
                                {profile?.followers ?? 0}
                            </span>

                            <span className="text-sm text-muted-foreground">
                                Followers
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <span className="font-semibold">
                                {userData?.articleCount ?? 0}
                            </span>

                            <span className="text-sm text-muted-foreground">
                                Articles
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <span className="font-semibold">
                                {userData?.seriesCount ?? 0}
                            </span>

                            <span className="text-sm text-muted-foreground">
                                Series
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <span className="font-semibold">
                                {userData?.totalViews ?? 0}
                            </span>

                            <span className="text-sm text-muted-foreground">
                                Views
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Overview