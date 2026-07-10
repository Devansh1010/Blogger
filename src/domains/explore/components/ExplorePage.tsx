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
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">

            {/* HEADER */}
            <section className="mb-20">

                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left */}
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight">
                            {debouncedValue
                                ? "Related Series"
                                : "Trending Series"}
                        </h2>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col items-end gap-3">

                        <div className='flex items-center gap-3'>
                            {/* Search */}
                            <Searchbar
                                value={search}
                                setValue={setSearch}
                            />

                            {/* Filter */}
                            {/* <FilterSearch
                                tagSearch={tagSearch}
                                setTagSearch={setTagSearch}
                                isTagPending={isTagPending}
                                filteredTags={filteredTags}

                            /> */}
                        </div>

                        {/* <ActiveFilter tag={tag} /> */}
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
            <section className="space-y-10">

                <div className="flex items-center justify-between pb-1">

                    <h2 className="text-xl font-semibold">
                        {debouncedValue
                            ? "Results"
                            : "Latest Articles"}
                    </h2>

                    <span className="text-sm text-muted-foreground">
                        {articles?.pagination?.total || 0} articles
                    </span>

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
                                    <EmptyState
                                        message={
                                            `No articles foundd for ${debouncedValue}`
                                        }
                                    />
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