import Image from "next/image";
import Link from "next/link";
import { Clock3, Heart, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


import { Article } from "@/domains/article/type";
import { formatDate } from "@/domains/explore/utils/dateFormate";

interface ArticleCardProps {
    article: Article;
    topRight?: React.ReactNode;
}

const ArticleCard = ({ article, topRight }: ArticleCardProps) => {
    const formattedDate = article.publishedAt
        ? formatDate(article.publishedAt)
        : "Draft";

    const articleViews = article.views ?? 0;
    const articleLikes = article.likes ?? 0;

    return (
        <Link
            href={`/user/explore/${article.slug}`}
            className="group block"
        >
            <Card className="group mb-5 overflow-hidden border border-border/70 bg-card/80 p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)]">
                <div className="relative aspect-video overflow-hidden bg-muted">
                    {article.coverImage ? (
                        <Image
                            src={article.coverImage}
                            alt={article.title}
                            fill
                            sizes="(max-width:768px)100vw,50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-background text-muted-foreground">
                            No Cover Image
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                    {topRight && (
                        <div className="absolute right-3 top-3 z-20">
                            {topRight}
                        </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-2">
                            {article.level && (
                                <Badge className="border-white/20 bg-white/10 text-white backdrop-blur-sm">
                                    {article.level}
                                </Badge>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="border-white/20 bg-white/10 text-white backdrop-blur-sm">
                                <Clock3 className="mr-1 h-3 w-3" />
                                {article.readTime} min
                            </Badge>
                        </div>
                    </div>
                </div>

                <CardContent className="space-y-4 px-5 py-4 sm:px-5 sm:py-5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <Avatar className="h-9 w-9 border border-border/80">
                                <AvatarImage src={article.author?.avatar} alt={article.author?.username} />
                                <AvatarFallback>
                                    {article.author?.username?.charAt(0)?.toUpperCase() ?? "U"}
                                </AvatarFallback>
                            </Avatar>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-foreground">
                                    {article.author?.username}
                                </p>
                            </div>
                        </div>

                        <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            {formattedDate}
                        </span>
                    </div>

                    <div>
                        <h3 className="line-clamp-2 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                            {article.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                            {article.hook}
                        </p>
                    </div>

                    {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {article.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="rounded-full border-border/70 bg-muted/40">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center justify-between border-t border-border/60 pt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <Users className="h-4 w-4" />
                                <span>{articleViews}</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <Heart className="h-4 w-4" />
                                <span>{articleLikes}</span>
                            </div>
                        </div>

                        <span className="rounded-full bg-primary/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                            Read
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ArticleCard;