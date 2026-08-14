import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useGetUserProfile } from '@/domains/user/hooks/profile/useGetProfile'
import OverviewLoader from '../loader/OverviewLoader'
import ProfileError from '../error/ProfileError'
import EditProfile from '../EditProfile'
import CoverImage from './CoverImage'

const Overview = ({ userId }: { userId: string }) => {
    const {
        userData,
        isPending,
        isError,
        refetch
    } = useGetUserProfile(userId)

    if (isPending) return <OverviewLoader />
    if (isError) return <ProfileError refetch={refetch} />

    return (
        <section className="relative">
            {/* Cover */}
            <CoverImage userId={userId} />

            {/* Profile Content */}
            <div className="mx-auto max-w-5xl px-6">
                <div className="relative -mt-14">

                    {/* Avatar + Actions */}
                    <div className="flex items-end justify-between">

                        <Avatar className="h-28 w-28 border-4 border-background shadow-md">
                            <AvatarImage
                                src={userData?.userProfile?.avatar ?? ""}
                                alt={userData?.userProfile?.username}
                            />

                            <AvatarFallback className="text-3xl font-semibold">
                                {userData?.userProfile?.username?.[0]?.toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        {/* Action */}
                        <div className="mb-1">
                            {userData.isOwner ? (
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
                        <h1 className="text-3xl font-bold tracking-tight">
                            {userData?.userProfile?.username}
                        </h1>

                    </div>

                    {/* Stats */}
                    <div className="mt-6 flex items-center gap-6 border-t pt-5 text-sm">

                        <div>
                            <span className="font-semibold">
                                {userData?.userProfile?.followers ?? 0}
                            </span>
                            <span className="ml-1 text-muted-foreground">
                                Followers
                            </span>
                        </div>

                        <div>
                            <span className="font-semibold">
                                {userData?.articleCount ?? 0}
                            </span>
                            <span className="ml-1 text-muted-foreground">
                                Articles
                            </span>
                        </div>

                        <div>
                            <span className="font-semibold">
                                {userData?.seriesCount ?? 0}
                            </span>
                            <span className="ml-1 text-muted-foreground">
                                Series
                            </span>
                        </div>

                        <div>
                            <span className="font-semibold">
                                {userData?.totalViews ?? 0}
                            </span>
                            <span className="ml-1 text-muted-foreground">
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