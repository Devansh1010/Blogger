
import { SeriesListSectionProps } from '../types'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import SeriesCard from './SeriesCard';
import { cn } from "@/lib/utils";

const SeriesListPage = ({
    title,
    description,
    series,
    limit,
    viewAllHref,
    className
}: SeriesListSectionProps) => {
    const displayedSeries = limit
        ? series.slice(0, limit)
        : series;

    return (
        <section
            className={cn(
                "mx-auto mt-12 w-full max-w-7xl p-8 md:p-0 lg:p-0",
                className
            )}
        >
            {/* Section Header */}
            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                        {title}
                    </h2>

                    {description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>

                {viewAllHref && (
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="shrink-0 text-muted-foreground hover:text-foreground"
                    >
                        <Link href={viewAllHref}>
                            View all
                        </Link>
                    </Button>
                )}
            </div>

            {/* Content */}
            {displayedSeries.length === 0 ? (
                <Card className="flex min-h-48 items-center justify-center border-dashed">
                    <div className="text-center">
                        <p className="text-sm font-medium">
                            No series yet
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Series created by this author will appear here.
                        </p>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {displayedSeries.map((series) => (
                        <SeriesCard
                            key={series._id}
                            series={series}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default SeriesListPage