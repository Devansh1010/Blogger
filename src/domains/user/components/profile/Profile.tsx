'use client'

import ArticleListPage from '@/domains/article/components/blog_page/ArticleListPage'
import Overview from './_components/Overview'
import { useGetUserProfile } from '../../hooks/profile/useGetProfile'
import OverviewLoader from './loader/OverviewLoader'
import ProfileError from './error/ProfileError'
import SeriesListPage from '@/domains/series/components/SeriesListPage'
import SavedArticle from './_components/SavedArticle'

const Profile = ({ userId }: { userId: string }) => {
    const {
        userData,
        isPending,
        isError,
        refetch
    } = useGetUserProfile(userId)

    if (isPending) return <OverviewLoader />
    if (isError) return <ProfileError refetch={refetch} />

    return (
        <div className="pb-16">
            <Overview userId={userId} />

            <ArticleListPage
                title="Featured Articles"
                description="Hand-picked by the author."
                articles={userData?.userProfile.featuredArticles ?? []}
                className="max-w-5xl mt-14 px-6"
            />

            <SeriesListPage
                title="Featured Series"
                description="Hand-picked by the author."
                series={userData?.userProfile.featuredSeries ?? []}
                className="max-w-5xl mt-14 px-6 "
            />

            {
                userData?.isOwner &&
                <SavedArticle
                    userId={userId}
                    limit={2}
                    viewAllHref={`/user/my-blogs`}
                />
            }
        </div>
    )
}

export default Profile