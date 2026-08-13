import Image from "next/image";
import Link from "next/link";
import { Calendar, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SeriesCardProps } from "../types";
import { formatDate } from "@/domains/explore/utils/dateFormate";



const SeriesCard = ({ series, topRight }: SeriesCardProps) => {

    const formatedDate = formatDate(series.publishedAt)

    return (
        <Link
            href={`/series/${series.slug}`}
            className="group block"
        >
            <Card className="overflow-hidden p-0 mb-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                {/* Cover */}
                <div className="relative aspect-video overflow-hidden bg-muted">

                    <Image
                        src={series.coverImage ?? ""}
                        alt={series.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {topRight && (
                        <div
                            className="absolute top-3 right-3 z-10"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            {topRight}
                        </div>
                    )}

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

                            {/* <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {series.blogs.length}
                            </div> */}

                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {series.views}
                            </div>

                        </div>

                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatedDate}
                        </div>

                    </div>

                </CardContent>

            </Card>
        </Link>
    );
};

export default SeriesCard;