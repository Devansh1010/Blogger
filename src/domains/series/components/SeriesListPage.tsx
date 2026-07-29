import React from 'react'
import { SeriesListSectionProps } from '../types'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { SeriesCard } from '@/components/features/series/components/series-list/SeriesCard';

const SeriesListPage = ({
    title,
    description,
    series,
    limit,
    viewAllHref
}: SeriesListSectionProps) => {
    const displayedSeries = limit
        ? series.slice(0, limit)
        : series;

    return (
        <section className="mx-auto mt-12 w-full max-w-7xl p-8 lg:p-0 md:p-0">

            <div className="mb-6 flex items-center justify-between">

                <div>
                    <h2 className="text-2xl font-bold">
                        {title}
                    </h2>

                    {description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>

                {viewAllHref && (
                    <Button asChild variant="ghost">
                        <Link href={viewAllHref}>
                            View All
                        </Link>
                    </Button>
                )}

            </div>

            {displayedSeries.length === 0 ? (
                <Card className="flex h-56 items-center justify-center">
                    <p className="text-muted-foreground">
                        No series available.
                    </p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {displayedSeries.map(series => (
                        <SeriesCard
                            key={series.id}
                            series={series}
                        />
                    ))}
                </div>
            )}

        </section>
    )
}

export default SeriesListPage