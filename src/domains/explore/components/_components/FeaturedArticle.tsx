import { AspectRatio } from "@/components/ui/aspect-ratio"

import Image from "next/image"
import Link from "next/link"
import { Clock, Eye } from "lucide-react";
import { LevelBadge, TagBadge } from "@/components/features/badges/MetaBedge";
import { useExploreArticles } from "@/domains/article/hooks/useExploreArticles";
import { ArticleListError } from "../error/ListArticleError";
import { formatDate } from "../../utils/dateFormate";
import { FeaturedArticleSkeleton } from "../loader/FeaturedArticleSkeleton";

const FeaturedArticle = ({ page }: { page: number }) => {

    const {
        articles,
        isPending,
        isError,
        refetch
    } = useExploreArticles({ page });

    if (isPending) return <FeaturedArticleSkeleton />

    if (isError) return <ArticleListError reset={refetch} />

    const formattedDate = formatDate(articles?.featuredBlog?.publishedAt)

    const featured = articles?.featuredBlog;

    return (

        <section className="group py-12 lg:py-16">
            <Link
                href={`/user/explore/${featured?.slug}`}
            >

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-16 items-center">

                    <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between">
                        <div className="space-y-6">
                            {/* META TOP */}
                            <div className="flex items-center gap-2">

                                <span className=" inline-flex rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-primary">
                                    Featured
                                </span>

                                <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />

                                <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">
                                    {formattedDate}
                                </span>
                            </div>

                            {/* TITLE AREA */}
                            <div className="space-y-3">
                                <h3 className="text-sm italic text-muted-foreground normal-case">
                                    {featured?.hook}
                                </h3>
                                <h2 className="text-3xl lg:text-5xl font-serif font-bold leading-tight tracking-tight text-zinc-950 dark:text-white group-hover:text-primary transition-colors duration-300">
                                    {featured?.title || "Untitled Post"}
                                </h2>
                            </div>

                            {/* EXCERPT */}
                            <p className="max-w-xl text-muted-foreground font-serif dark:text-zinc-400 leading-relaxed text-base font-medium line-clamp-3">
                                {featured?.excerpt || featured?.desc}
                            </p>

                            {/* STATS & TAGS */}
                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <div className="flex items-center gap-5 text-xs font-bold uppercase tracking-widest text-zinc-400">
                                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {featured.readTime}m</span>
                                    <span className="flex items-center gap-1.5"><Eye className="w-3 h-3" /> {featured.views}</span>
                                </div>
                                <div className="flex gap-2">
                                    {featured?.tags?.slice(0, 2).map((tag: string) => (
                                        <TagBadge key={tag}>
                                            {tag}
                                        </TagBadge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Author */}
                        <div className="mt-auto pt-8 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden relative">

                                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">{featured.username.slice(0, 2)}</div>

                                </div>
                                <p className="text-xs font-bold uppercase tracking-tight text-zinc-500">
                                    {featured?.username || "unknown"}
                                </p>
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] group-hover:mr-2 transition-all">
                                Read Story →
                            </span>
                        </div>
                    </div>

                    {/* IMAGE SIDE */}
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <div className="relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 shadow-2xl ring-1 ring-border/50">
                            <AspectRatio ratio={16 / 9} className="h-full">
                                <Image
                                    src={featured.coverImage || ''}
                                    alt={featured.title}
                                    fill
                                    priority
                                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                                />
                                {/* Level Badge Overlay */}
                                <div className="top-5 right-5">
                                    <LevelBadge title={featured.level} />
                                </div>
                            </AspectRatio>
                        </div>
                    </div>

                </div>
            </Link>
        </section>

    )
}

export default FeaturedArticle