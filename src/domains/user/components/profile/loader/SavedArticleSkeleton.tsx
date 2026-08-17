import { Skeleton } from "@/components/ui/skeleton";

const SavedArticleSkeleton = () => {
    return (
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2 mt-5">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-xl border bg-card"
                >
                    {/* Cover */}
                    <Skeleton className="aspect-video w-full rounded-none" />

                    <div className="p-4">
                        {/* Title */}
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-[85%]" />
                            <Skeleton className="h-5 w-[60%]" />
                        </div>

                        {/* Author */}
                        <div className="mt-4 flex items-center gap-2">
                            <Skeleton className="size-7 rounded-full" />
                            <Skeleton className="h-4 w-28" />
                        </div>

                        {/* Stats */}
                        <div className="mt-4 flex gap-4">
                            <Skeleton className="h-3.5 w-14" />
                            <Skeleton className="h-3.5 w-20" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SavedArticleSkeleton;