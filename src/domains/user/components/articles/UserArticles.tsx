'use client'

import { PaginationUI } from "@/components/features/series/components/PaginationUi"
import ArticleCard from "@/domains/article/components/blog_page/_components/ArticleCard"
import { Article } from "@/domains/article/type"
import { useState } from "react"
import { useFeaturedArticle } from "../../hooks/featured/useFeaturedArticle"
import { useDeleteArticle } from "../../hooks/useDeleteArticle"
import { useUserArticles } from "../../hooks/useUserArticles"
import Actions from "./_components/Actions"
import UserArticleSearch from "./_components/UserArticleSearch"
import { UserArticleError } from "./error/UserArticleError"
import { UserArticlesSkeleton } from "./loader/UserArticleSkeleton"

const UserArticles = () => {

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const {
        userArticles,
        isPending,
        isError,
        refetch
    } = useUserArticles({ page })

    const mutation = useDeleteArticle()

    const onFeature = useFeaturedArticle()

    if (isPending) return <UserArticlesSkeleton />
    if (isError) return <UserArticleError onRetry={refetch} />

    return (
        <div className="mx-auto max-w-7xl px-6 py-8">
            <header className="mb-8 rounded-[28px] border border-border/60 bg-card/70 p-5 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-3xl font-serif font-bold leading-tight text-foreground md:text-5xl">
                            My Blogs
                        </h1>
                    </div>

                    <div className="flex w-full items-center gap-3 md:w-auto md:max-w-sm">
                        <div className="relative w-full">
                            <UserArticleSearch
                                value={search}
                                setValue={setSearch}
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="min-h-[20rem]">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {userArticles?.blogs?.map((article: Article) => (
                        <ArticleCard
                            key={article._id}
                            article={article}
                            topRight={
                                <Actions
                                    id={article._id}
                                    slug={article.slug}
                                    isFeatured={article.isFeatured}
                                    isPublished={article.isPublished}
                                    isArticle={true}
                                    onDelete={mutation.mutate}
                                    onFeature={onFeature.mutate}
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