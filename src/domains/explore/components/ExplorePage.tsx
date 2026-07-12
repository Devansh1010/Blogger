import { useExploreArticles } from '@/domains/article/hooks/useExploreArticles';
import { useState } from 'react'
import { useSeries } from '@/domains/series/hooks/useSeries';
import { Searchbar } from './_components/Searchbar';
import { SeriesSkeleton } from './loader/SeriesSkeleton';
import { ArticleListError } from './error/ListArticleError';
import TopSeries from './_components/TopSeries';
import { BlogsGridSkeleton } from './loader/ArticleGridSkeleton';
import FeaturedArticle from './_components/FeaturedArticle';
import { PaginationUI } from '@/components/features/series/components/PaginationUi';
import RestArticles from './_components/RestArticles';
import { BookOpen, ChevronDown, } from 'lucide-react';


const ExplorePage = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const isInitialPage = page === 1;

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
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:py-10">
            {/* HEADER */}

            <section className="flex min-h-[85vh] flex-col items-center justify-center ">
                <div className="mb-16 flex justify-center">
                    <div className="w-full max-w-xl text-center space-y-3">
                        <h1 className="text-3xl font-bold">
                            What do you want to learn today?
                        </h1>

                        <p className="mt-3 text-muted-foreground">
                            Search thousands of developer insights,
                            tutorials, and curated learning series.
                        </p>

                        <Searchbar
                            value={search}
                            setValue={setSearch}
                        />
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center gap-2 text-muted-foreground">
                    <span className="text-sm">

                        Discover trending learning paths
                    </span>

                    <ChevronDown className="h-5 w-5 animate-bounce" />
                </div>
            </section>

            <section className="mx-auto mb-10 text-center">
                <div className="">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Trending Series
                    </h2>
                    <p className="mt-3 text-base text-muted-foreground">
                        Explore curated series that match your interests.
                    </p>
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
            <section className="mt-12 border-t border-border/50 pt-20">

                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                            Latest Articles
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            Fresh insights from the community.
                        </p>
                    </div>

                    <span className="text-sm text-muted-foreground">
                        {articles?.pagination?.total ?? 0} Articles
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
                                )
                            }

                            <div className="mb-8 mt-16 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-primary" />

                                <h3 className="text-xl font-semibold">
                                    Continue Reading
                                </h3>
                            </div>

                            {/* Rest Blogs */}
                            {
                                articles.blogs.length > 0 &&

                                <RestArticles rest={articles.blogs} />
                            }
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