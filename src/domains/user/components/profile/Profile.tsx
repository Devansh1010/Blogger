'use client'

import ArticleListPage from '@/domains/article/components/blog_page/ArticleListPage'
import Overview from './_components/Overview'
import { useGetUserProfile } from '../../hooks/profile/useGetProfile'
import OverviewLoader from './loader/OverviewLoader'
import ProfileError from './error/ProfileError'
import SeriesListPage from '@/domains/series/components/SeriesListPage'
import SavedArticle from './_components/SavedArticle'
import { useFeaturedArticle } from '@/domains/user/hooks/featured/useFeaturedArticle'
import { useFeaturedSeries } from '@/domains/user/hooks/featured/useFeaturedSeries'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

const Profile = ({ userId }: { userId: string }) => {
    const {
        userData,
        isPending,
        isError,
        refetch
    } = useGetUserProfile(userId)

    const featuredArticleMutation = useFeaturedArticle()
    const featuredSeriesMutation = useFeaturedSeries()

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
                renderTopRight={(article) => userData?.isOwner ? (
                    <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-full shadow-sm"
                        onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            featuredArticleMutation.mutate(article._id)
                        }}
                        aria-label="Remove featured article"
                    >
                        <Star className="h-4 w-4 fill-primary text-primary" />
                    </Button>
                ) : null}
            />

            <SeriesListPage
                title="Featured Series"
                description="Hand-picked by the author."
                series={userData?.userProfile.featuredSeries ?? []}
                className="max-w-5xl mt-14 px-6 "
                renderTopRight={(series) => userData?.isOwner ? (
                    <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-full shadow-sm"
                        onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            featuredSeriesMutation.mutate(series._id)
                        }}
                        aria-label="Remove featured series"
                    >
                        <Star className="h-4 w-4 fill-primary text-primary" />
                    </Button>
                ) : null}
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