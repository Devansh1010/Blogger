import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"

import {
    Trash2,
    Pencil,
    FileText,
    Plus,
} from "lucide-react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useUserArticles } from "@/domains/user/hooks/useUserArticles"
import { useDebounceSearch } from "@/domains/explore/hooks/useDebounceSearch"
import { UserArticlesSkeleton } from "../loader/UserArticleSkeleton"
import { UserArticleError } from "../error/UserArticleError"
import NoArticle from "./NoArticle"
import { deleteUserArticle } from "@/domains/user/axios/user.axios"

const ListArticles = ({ page, search }: { page: number, search: string }) => {

    const { debouncedValue } = useDebounceSearch({ value: search })

    const {
        userArticles,
        isPending,
        isError,
        refetch } = useUserArticles({ page, search: debouncedValue })


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
                            <div className="relative w-full overflow-hidden rounded-[1.5rem] bg-muted aspect-16/10 border border-border/30 shadow-sm">
                                <Image
                                    src={blog?.coverImage || '/placeholder-blog.jpg'} // Fallback image
                                    alt={blog?.title || "Blog cover"}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />

                                {/* OVERLAY ACTIONS */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2.5 group-hover:translate-y-0">
                                    <Link href={`/write-blog/${blog.slug}`}>
                                        <Button variant="secondary" size="icon" className="h-9 w-9 rounded-full  backdrop-blur shadow-md ">
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    </Link>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                className="h-9 w-9 rounded-full bg-white/95 backdrop-blur shadow-md text-destructive hover:bg-destructive hover:text-white"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="rounded-[2rem]">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="font-serif text-2xl">Remove Story</AlertDialogTitle>
                                                <AlertDialogDescription className="text-base">
                                                    This action is permanent. This will delete <span className="font-semibold text-foreground italic">&quot;{blog.title}&quot;</span> from your dashboard.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className="mt-4">
                                                <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => deleteUserArticle(blog.slug)}
                                                    className="rounded-full bg-destructive hover:bg-destructive/90"
                                                >
                                                    Delete Permanently
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>

                            {/* TEXT CONTENT */}
                            <div className="flex flex-col space-y-3 px-1">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            className={`text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold border-none shadow-none ${blog.isPublished
                                                ? "bg-emerald-500/10 text-emerald-600"
                                                : "bg-orange-500/10 text-orange-600"
                                                }`}
                                        >
                                            {blog.isPublished ? "Live" : "Draft"}
                                        </Badge>
                                        {/* Optional: Read Time indicator */}
                                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                                            {blog.readTime} : min read
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                        {blog.createdAt
                                            ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric"
                                            })
                                            : "Last Modified"}
                                    </span>
                                </div>

                                <Link href={`/user/explore/${blog.slug}`}>
                                    <h4 className="text-xl font-serif font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2 decoration-primary/30 underline-offset-4 group-hover:underline">
                                        {blog.title}
                                    </h4>
                                </Link>
                                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                    {blog.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
       
    )
}

export default ListArticles