'use client'
import {
    FileText,
    Plus,
} from "lucide-react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useUserArticles } from "@/domains/user/hooks/useUserArticles"
import { UserArticlesSkeleton } from "../loader/UserArticleSkeleton"
import { UserArticleError } from "../error/UserArticleError"
import NoArticle from "./NoArticle"
import ArticleCard from "./ArticleCard"

const ListArticles = ({ page }: { page: number }) => {

    const {
        userArticles,
        isPending,
        isError,
        refetch
    } = useUserArticles({ page })


    if (isPending) return <UserArticlesSkeleton />
    if (isError) return <UserArticleError onRetry={refetch} />

    return (
        <div className="space-y-10">
            {/* HEADER SECTION */}
            <div className="flex items-center justify-between border-b border-border/50 pb-6">
                <div className="space-y-1">
                    <h3 className="text-2xl font-serif font-bold tracking-tight text-foreground">
                        Recent Stories
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
                        <FileText className="w-3 h-3 text-primary/60" />

                        {/* <span>Showing {userArticles?.length} Stories</span> */}
                    </div>
                </div>
                <Link href="/write-blog">
                    <Button size="sm" className="rounded-full px-6 font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/10 transition-all hover:-translate-y-px hover:shadow-primary/20">
                        <Plus className="w-3.5 h-3.5 mr-2" /> New Post
                    </Button>
                </Link>
            </div>

            {userArticles?.blogs?.length === 0 ? (
                <NoArticle />
            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-10 gap-y-16">
                    {userArticles?.blogs?.map((blog) => (
                        <div
                            key={blog._id}
                            className="group relative flex flex-col space-y-5 transition-all"
                        >
                            {/* IMAGE CONTAINER */}
                            <ArticleCard
                                blog={blog}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>

    )
}

export default ListArticles