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
            <CoverImage
                userId={userId}
            />

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
                            {userData?.userProfile?.followers ?? 0}
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
                        <span className="font-semibold">
                            {userData?.totalViews ?? 0}
                        </span>{" "}
                        Views
                    </div>
                </div>

                <div className='flex gap-2'>
                    <Button className="mt-6">
                        Follow
                    </Button>

                    {/* <EditProfile
                        userId={userId}
                    /> */}
                </div>

            </div>
        </section>
    )
}

export default Overview