import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function FeaturedArticleSkeleton() {
    return (
        <section className="py-12 lg:py-16 animate-pulse">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14 xl:gap-16">

                {/* CONTENT */}
                <div className="order-2 flex flex-col justify-between lg:order-1 lg:col-span-5">

                    <div className="space-y-6">

                        {/* Meta */}
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-1 w-1 rounded-full" />
                            <Skeleton className="h-3 w-24" />
                        </div>

                        {/* Hook + Title */}
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-48" />

                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-11/12" />
                            <Skeleton className="h-10 w-3/4" />
                        </div>

                        {/* Excerpt */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 pt-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-16" />

                            <div className="ml-auto flex gap-2">
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Author */}
                    <div className="mt-8 flex items-center justify-between border-t pt-8">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                        </div>

                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>

                {/* IMAGE */}
                <div className="order-1 lg:order-2 lg:col-span-7">
                    <div className="overflow-hidden rounded-2xl ring-1 ring-border/50">
                        <AspectRatio ratio={16 / 9}>
                            <Skeleton className="h-full w-full rounded-2xl" />
                        </AspectRatio>
                    </div>
                </div>
            </div>
        </section>
    );
}