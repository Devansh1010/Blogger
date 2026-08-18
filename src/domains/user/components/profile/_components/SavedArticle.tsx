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
import { SavedArticleProps } from "@/domains/user/type";



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
        ? savedArticle?.articles?.slice(0, limit)
        : savedArticle.articles;

    return (
        <section className="mx-auto mt-14 w-full max-w-5xl">
            <div className="rounded-[28px] border border-border/60 bg-card/70 p-5 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-6">
                <div className="mb-6 flex items-end justify-between gap-4 border-b border-border/60 pb-4">
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight text-foreground">
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

                {!displayedArticles || displayedArticles.length === 0 ? (
                    <Card className="flex min-h-48 items-center justify-center border-dashed border-border/70 bg-muted/30">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 text-primary">
                                <Bookmark className="size-6" />
                            </div>

                            <p className="text-sm font-medium text-foreground">
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
                                className="group overflow-hidden border-border/70 bg-background/80 p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)]"
                            >
                                <Link href={`/article/${article.slug}`}>
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
                                            <div className="flex h-full items-center justify-center bg-linear-to-br from-muted to-background">
                                                <Bookmark className="size-8 text-muted-foreground/40" />
                                            </div>
                                        )}
                                    </div>

                                    <CardContent className="space-y-4 p-4">
                                        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                                            {article.title}
                                        </h3>

                                        <div className="flex items-center gap-2">
                                            <Avatar className="size-7 border border-border/80">
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

                                        <div className="flex items-center gap-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1.5">
                                                <Eye className="size-3.5" />
                                                {article.views}
                                            </span>

                                            <span className="flex items-center gap-1.5">
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
            </div>
        </section>
    );
};

export default SavedArticle;