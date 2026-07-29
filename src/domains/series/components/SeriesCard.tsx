import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Series } from "../types";



interface SeriesCardProps {
    series: Series;
}

const SeriesCard = ({ series }: SeriesCardProps) => {
    return (
        <Link
            href={`/series/${series.slug}`}
            className="group block"
        >
            <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                {/* Cover */}
                <div className="relative aspect-video overflow-hidden bg-muted">

                    <Image
                        src={series.coverImage ?? ""}
                        alt={series.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <Badge className="absolute right-3 top-3">
                        <BookOpen className="mr-1 h-3 w-3" />
                        {series.blogs.length} Articles
                    </Badge>

                </div>

                <CardContent className="space-y-5 p-6">

                    <div>
                        <h3 className="line-clamp-2 text-xl font-bold transition-colors group-hover:text-primary">
                            {series.title}
                        </h3>

                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                            {series.desc}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {series.tags?.slice(0, 3).map(tag => (
                            <Badge
                                key={tag}
                                variant="outline"
                            >
                                #{tag}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">

                        <div className="flex items-center gap-5">

                            <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {series.blogs.length}
                            </div>

                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                1.2K
                            </div>

                        </div>

                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Jul 2026
                        </div>

                    </div>

                </CardContent>

            </Card>
        </Link>
    );
};

export default SeriesCard;