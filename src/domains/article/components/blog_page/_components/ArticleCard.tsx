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

    return (
        <Link
            href={`/user/explore/${article.slug}`}
            className="group block"
        >
            <Card className="overflow-hidden mb-5 p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                {/* Cover */}
                <div className="relative aspect-video overflow-hidden bg-muted min-h-50">

                    {article.coverImage ? (
                        <Image
                            src={article.coverImage}
                            alt={article.title}
                            fill
                            sizes="(max-width:768px)100vw,50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                            No Cover Image
                        </div>
                    )}

                    {/* Actions */}
                    {topRight && (
                        <div className="absolute right-3 top-3 z-20">
                            {topRight}
                        </div>
                    )}

                    {/* Badges */}
                    <div className="absolute bottom-3 right-3 flex gap-2">
                        <Badge
                            variant="secondary"
                            className="backdrop-blur-sm"
                        >
                            <Clock3 className="mr-1 h-3 w-3" />
                            {article.readTime} min
                        </Badge>

                        <Badge>{article.level}</Badge>
                    </div>
                </div>

                <CardContent className="space-y-5 px-6 py-2">

                    {/* Author */}
                    <div className="flex items-center gap-3">

                        <Avatar className="h-9 w-9">
                            <AvatarImage src={article.author?.avatar} />
                            <AvatarFallback>
                                {article.author?.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <span className="text-sm font-medium text-muted-foreground">
                            {article.author?.username}
                        </span>

                    </div>

                    {/* Title */}
                    <div>
                        <h3 className="line-clamp-1 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
                            {article.title}
                        </h3>

                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                            {article.hook}
                        </p>
                    </div>

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {article.tags.slice(0, 3).map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="outline"
                                >
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">

                        <div className="flex items-center gap-5">

                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{
                                    Number.isNaN(article.views) ?
                                        Number(article.views) : 0
                                }</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                <span>{
                                Number.isNaN(article.likes) ?
                                    Number(article.likes) : 0
                                }</span>
                            </div>

                        </div>

                        <span>{formattedDate}</span>

                    </div>

                </CardContent>
            </Card>
        </Link>
    );
};

export default ArticleCard;