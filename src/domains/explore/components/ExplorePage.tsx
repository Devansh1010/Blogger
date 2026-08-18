import { PaginationUI } from '@/components/features/series/components/PaginationUi';
import { useExploreArticles } from '@/domains/article/hooks/useExploreArticles';
import { BookOpen, ChevronDown, } from 'lucide-react';
import { useState } from 'react';
import FeaturedArticle from './_components/FeaturedArticle';
import RestArticles from './_components/RestArticles';
import TopSeries from './_components/TopSeries';

import { ExploreSearchbar } from './_components/ExploreSearchbar';


const ExplorePage = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const isInitialPage = page === 1;

    const {
        articles,
        isPending,
        isError,
    } = useExploreArticles({ page });


    const popularTopics = ["Frontend", "Backend", "AI", "System Design", "DevOps", "Productivity"]

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-10">
            <section className="relative overflow-hidden rounded-[32px] border border-border/60 bg-linear-to-br from-background via-background to-primary/3 px-4 py-8 text-center shadow-[0_24px_90px_-42px_rgba(15,23,42,0.45)] sm:px-6 lg:px-8 lg:py-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.20),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_35%)]" />

                <div className="relative flex items-center justify-center">
                    <div className="flex w-full flex-col items-center">

                        <p className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28rem] text-primary">
                            Explore
                        </p>

                        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Learn from the ideas shaping modern engineering.
                        </h1>

                        <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
                            Search developer insights, practical tutorials, and highly curated
                            learning paths designed to keep you moving forward.
                        </p>

                        <div className="mt-8 w-full max-w-2xl rounded-[24px] border border-border/70 bg-background/80 p-3 text-left shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] backdrop-blur-sm">
                            <ExploreSearchbar value={search} setValue={setSearch} />
                        </div>

                        <div className="mt-6 flex flex-wrap justify-center gap-2">
                            {popularTopics.map((topic) => (
                                <span
                                    key={topic}
                                    className="rounded-full border border-border/70 bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative mt-10 flex flex-col items-center gap-2 text-muted-foreground">
                    <span className="text-sm">
                        Discover trending learning paths
                    </span>

                    <ChevronDown className="h-5 w-5 animate-bounce" />
                </div>
            </section>

            <section className="mx-auto mb-10 mt-16 text-center">
                <div className="mb-6 text-left md:text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">Trending now</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Featured learning series</h2>
                    <p className="mt-3 text-base text-muted-foreground md:max-w-2xl md:mx-auto">
                        Explore curated series designed to help you build depth, not just consume content.
                    </p>
                </div>

                <div className="rounded-[30px] border border-border/60 bg-card/60 p-2 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-4">
                    <TopSeries isInitialPage={isInitialPage} />
                </div>
            </section>

            <section className="mt-8 border-t border-border/60 pt-12 md:pt-16">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">Fresh reads</p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Latest articles</h2>
                    </div>

                    <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-sm text-muted-foreground">
                        {articles?.pagination?.total ?? 0} articles
                    </span>
                </div>

                <div className="min-h-80">
                    {isInitialPage && (
                        <div className="mb-16 mt-8">
                            <FeaturedArticle page={page} />
                        </div>
                    )}

                    <div className="mb-8 mt-8 flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <BookOpen className="h-4 w-4" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">Continue reading</h3>
                    </div>

                    <RestArticles page={page} />
                </div>
            </section>

            {!isPending && !isError && articles?.pagination?.totalPages > 1 && (
                <footer className="mt-24 border-t border-border/60 pt-12">
                    <PaginationUI
                        page={page}
                        totalPages={articles?.pagination?.totalPages || 1}
                        onPageChange={(newPage) => {
                            setPage(newPage)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                    />
                </footer>
            )}
        </div>
    )
}

export default ExplorePage