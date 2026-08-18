'use client'

import { PaginationUI } from "@/components/features/series/components/PaginationUi";
import SeriesCard from "@/domains/series/components/SeriesCard";
import { useGetUserSeries } from "@/domains/series/hooks/useGetUserSeries";
import { Series } from "@/domains/series/types";
import { useState } from "react";
import { useFeaturedSeries } from "../../hooks/featured/useFeaturedSeries";
import { useDeleteSeries } from "../../hooks/useDeleteSeries";
import { UserArticleError } from "../articles/error/UserArticleError";
import { UserArticlesSkeleton } from "../articles/loader/UserArticleSkeleton";
import Actions from "../articles/_components/Actions";


const UserSeries = () => {

    const [page, setPage] = useState(1);
    // const [search, setSearch] = useState("");

    const {
        userSeries,
        isPending,
        isError,
        refetch
    } = useGetUserSeries({ page })

    const onDelete = useDeleteSeries()

    const onFeature = useFeaturedSeries()

    if (isPending) return <UserArticlesSkeleton />
    if (isError) return <UserArticleError onRetry={refetch} />

    return (
        <div className="mx-auto max-w-7xl px-6 py-8 pt-20">
            <header className="mb-8 rounded-[28px] border border-border/60 bg-card/70 p-5 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-3xl font-serif font-bold leading-tight text-foreground md:text-5xl">
                            My Series
                        </h1>
                    </div>
                </div>
            </header>

            <main className="min-h-[20rem]">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {userSeries?.map((series: Series) => (
                        <SeriesCard
                            key={series.slug}
                            series={series}
                            topRight={
                                <Actions
                                    id={series._id}
                                    isArticle={false}
                                    slug={series.slug}
                                    onFeature={onFeature.mutate}
                                    onDelete={onDelete.mutate}
                                />
                            }
                        />
                    ))}
                </div>
            </main>

            <footer className="mt-12 flex flex-col items-center gap-6 border-t border-border/40 pt-12">
                <div className="text-[10px] font-mono uppercase tracking-[0.28rem] text-muted-foreground/40">
                    End of Transmission
                </div>
                <PaginationUI
                    page={page}
                    totalPages={userSeries?.pagination?.totalPages || 1}
                    onPageChange={(newPage) => {
                        setPage(newPage);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                />
            </footer>
        </div>
    );
};

export default UserSeries