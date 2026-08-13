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
        <div className="max-w-7xl mx-auto px-6 py-5 pt-20">

            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8">
                <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-foreground">
                    <span className="flex items-center gap-3">
                        My Series
                    </span>
                </h1>

                {/* <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative group w-full md:w-72">
                        <UserArticleSearch
                            value={search}
                            setValue={setSearch}
                        />
                    </div>
                </div> */}
            </header>

            <main className="min-h-125">

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

            <footer className="flex flex-col items-center gap-6 pt-12 border-t border-border/40">
                <div className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-widest">
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