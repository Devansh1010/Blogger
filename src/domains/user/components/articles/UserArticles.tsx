'use client'

import { useState } from "react"
import { PaginationUI } from "@/components/features/series/components/PaginationUi"
import { useUserArticles } from "../../hooks/useUserArticles"
import ListArticles from "./_components/ListArticles"
import { UserArticleError } from "./error/UserArticleError"
import { UserArticlesSkeleton } from "./loader/UserArticleSkeleton"
import UserArticleSearch from "./_components/UserArticleSearch"

const UserArticles = () => {

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const {
        userArticles,
        isPending,
        isError,
        refetch
    } = useUserArticles({ page })



    if (isPending) return <UserArticlesSkeleton />
    if (isError) return <UserArticleError onRetry={refetch} />

    return (
        <div className="max-w-7xl mx-auto px-6 py-5">

            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8">
                <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-foreground">
                    <span className="flex items-center gap-3">
                        My Blogs
                    </span>
                </h1>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative group w-full md:w-72">
                        <UserArticleSearch
                            value={search}
                            setValue={setSearch}
                        />
                    </div>
                </div>
            </header>

            <main className="min-h-125">
                <ListArticles
                    page={page}
                />
            </main>

            <footer className="flex flex-col items-center gap-6 pt-12 border-t border-border/40">
                <div className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-widest">
                    End of Transmission
                </div>
                <PaginationUI
                    page={page}
                    totalPages={userArticles?.pagination?.totalPages || 1}
                    onPageChange={(newPage) => {
                        setPage(newPage);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                />
            </footer>
        </div>
    );
};

export default UserArticles