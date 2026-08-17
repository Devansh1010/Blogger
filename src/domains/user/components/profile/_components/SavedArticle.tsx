import Link from "next/link";
import Image from "next/image";

import { Eye, Clock, Bookmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { useSavedArticles } from "@/domains/user/hooks/profile/useSavedArticles";
import SavedArticleSkeleton from "../loader/SavedArticleSkeleton";
import SavedArticleError from "../error/SavedArticleError";
import { Article } from "@/domains/article/type";

interface SavedArticleProps {
    userId: string;
    limit?: number;
    viewAllHref?: string;
}

const SavedArticle = ({
    userId,
    limit,
    viewAllHref,
}: SavedArticleProps) => {
    const {
        savedArticle,
        isPending,
        isError,
    } = useSavedArticles(userId);

    if (isPending) {
        return <SavedArticleSkeleton />;
    }

    if (isError) {
        return <SavedArticleError />;
    }

    const displayedArticles = limit
        ? savedArticle?.slice(0, limit)
        : savedArticle;

    return (
        <section className="mx-auto mt-14 w-full max-w-5xl px-6 ">
            {/* Header */}
            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                        Saved Articles
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Articles saved by the author.
                    </p>
                </div>

                {viewAllHref && (
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="shrink-0 text-muted-foreground hover:text-foreground"
                    >
                        <Link href={viewAllHref}>
                            View all
                        </Link>
                    </Button>
                )}
            </div>

            {/* Content */}
            {!displayedArticles || displayedArticles.length === 0 ? (
                <Card className="flex min-h-48 items-center justify-center border-dashed">
                    <div className="flex flex-col items-center text-center">
                        <Bookmark className="mb-3 size-7 text-muted-foreground/50" />

                        <p className="text-sm font-medium">
                            No saved articles yet
                        </p>

                        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                            Articles saved by the author will appear here.
                        </p>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {displayedArticles.map((article: Article) => (
                        <Card
                            key={article._id}
                            className="group overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <Link href={`/article/${article.slug}`}>
                                {/* Cover */}
                                <div className="relative aspect-video overflow-hidden bg-muted">
                                    {article.coverImage ? (
                                        <Image
                                            src={article.coverImage}
                                            alt={article.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <Bookmark className="size-8 text-muted-foreground/40" />
                                        </div>
                                    )}
                                </div>

                                <CardContent className="p-4">
                                    {/* Title */}
                                    <h3 className="line-clamp-2 text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                                        {article.title}
                                    </h3>

                                    {/* Author */}
                                    <div className="mt-4 flex items-center gap-2">
                                        <Avatar className="size-7">
                                            <AvatarImage
                                                src={article.author?.avatar}
                                                alt={article.author?.username}
                                            />

                                            <AvatarFallback>
                                                {article.author?.username
                                                    ?.charAt(0)
                                                    ?.toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>

                                        <span className="truncate text-sm text-muted-foreground">
                                            {article.author?.username}
                                        </span>
                                    </div>

                                    {/* Stats */}
                                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Eye className="size-3.5" />
                                            {article.views}
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <Clock className="size-3.5" />
                                            {article.readTime} min read
                                        </span>
                                    </div>
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
};

export default SavedArticle;