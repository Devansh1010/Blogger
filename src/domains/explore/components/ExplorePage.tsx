import { useExploreArticles } from '@/domains/article/hooks/useExploreArticles';
import { useState } from 'react'
import { useDebounceSearch } from '../hooks/useDebounceSearch';
import { useSeries } from '@/domains/series/hooks/useSeries';
import { Searchbar } from './_components/Searchbar';
import { SeriesSkeleton } from './loader/SeriesSkeleton';
import { ArticleListError } from './error/ListArticleError';
import TopSeries from './_components/TopSeries';
import { BlogsGridSkeleton } from './loader/ArticleGridSkeleton';
import FeaturedArticle from './_components/FeaturedArticle';
import { PaginationUI } from '@/components/features/series/components/PaginationUi';
import { EmptyState } from './_components/EmptyState';
import RestArticles from './_components/RestArticles';


const ExplorePage = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const isInitialPage = page === 1;

    const { debouncedValue } = useDebounceSearch({ value: search })

    const {
        articles,
        isPending,
        isError,
        refetch
    } = useExploreArticles({ page });

    const {
        series,
        isSeriesError,
        isSeriesPendding
    } = useSeries()


    return (
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:py-14">
            {/* HEADER */}
            <section className="mb-20">
                <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                    {/* Left */}
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">
                            {debouncedValue
                                ? "Related Series"
                                : "Trending Series"}
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            {debouncedValue
                                ? "Series related to your search."
                                : "Discover curated learning paths from the community."}
                        </p>
                    </div>

                    {/* Right */}
                    <div className="w-full lg:w-96">
                        <Searchbar
                            value={search}
                            setValue={setSearch}
                        />
                    </div>
                </div>

                {isSeriesPendding ? (
                    <SeriesSkeleton />
                ) : isSeriesError ? (
                    <ArticleListError reset={refetch} />
                ) : (
                    <TopSeries
                        isInitialPage={isInitialPage}
                        featuredSeries={series}
                    />
                )}

            </section>


            {/* ARTICLES */}
            <section className="flex flex-col mt-24 border-t border-border/50 pt-16">

                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            {debouncedValue
                                ? "Search Results"
                                : "Latest Articles"}
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {articles?.pagination?.total || 0} articles available
                        </p>
                    </div>
                </div>

                <div className="min-h-125">

                    {isPending ? (
                        <BlogsGridSkeleton />
                    ) : isError ? (
                        <ArticleListError reset={refetch} />
                    ) : (
                        <>
                            {/* Featured Blog */}
                            {isInitialPage &&
                                articles?.featuredBlog && (
                                    <div className="mb-20">
                                        <FeaturedArticle
                                            featured={articles.featuredBlog}
                                        />
                                    </div>
                                )}

                            {/* Rest Blogs */}
                            {articles.blogs.length > 0 ? (
                                <RestArticles rest={articles.blogs} />
                            ) : (
                                !articles?.featuredBlog && (
                                    <div className="flex min-h-125 items-center justify-center">
                                        <EmptyState
                                            message={`No articles found for "${debouncedValue}"`}
                                        />
                                    </div>
                                )
                            )}
                        </>
                    )}

                </div>

            </section>

            {/* PAGINATION */}
            {!isPending &&
                !isError &&
                articles?.pagination?.totalPages > 1 && (

                    <footer className="mt-24 border-t pt-12">

                        <PaginationUI
                            page={page}
                            totalPages={
                                articles?.pagination?.totalPages || 1
                            }
                            onPageChange={(newPage) => {
                                setPage(newPage);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        />

                    </footer>
                )}

        </div>
    )
}

export default ExplorePage