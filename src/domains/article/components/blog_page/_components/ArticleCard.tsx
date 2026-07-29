import Image from "next/image";
import Link from "next/link";
import { Clock3, Eye, Heart } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Article } from "@/domains/article/type";
import { formatDate } from "@/domains/explore/utils/dateFormate";

interface ArticleCardProps {
    article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
    const formatedDate = formatDate(article?.publishedAt)
    return (
        <Link href={`/user/explore/${article.slug}`} className="block group">
            <Card className="overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                {/* Cover */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image
                        src={article.coverImage ?? ""}
                        alt={article.title}
                        fill
                        sizes="(max-width:768px)100vw,50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute top-3 right-3 flex gap-2">
                        <Badge variant="secondary" className="backdrop-blur-sm">
                            <Clock3 className="mr-1 h-3 w-3" />
                            {article.readTime} min
                        </Badge>

                        <Badge>{article.level}</Badge>
                    </div>
                </div>

                <CardContent className="space-y-5 p-6">

                    {/* Title */}
                    <div>
                        <h3 className="line-clamp-2 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
                            {article.title}
                        </h3>

                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                            {article.hook}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {article.tags?.slice(0, 3).map((tag) => (
                            <Badge
                                key={tag}
                                variant="outline"
                            >
                                #{tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">

                        <div className="flex items-center gap-5">

                            <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{article.views.toLocaleString()}</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                <span>{article.likes.toLocaleString()}</span>
                            </div>

                        </div>

                        <span>
                            {formatedDate}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ArticleCard;