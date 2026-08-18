import { Skeleton } from "@/components/ui/skeleton";

const OverviewLoader = () => {
    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
            <div className="relative mb-4 overflow-hidden rounded-[32px] border border-border/60 bg-card/60 p-4 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-6">
                <Skeleton className="h-52 w-full rounded-[24px]" />
            </div>

            <div className="mx-auto max-w-5xl px-0 sm:px-2">
                <div className="relative -mt-14 rounded-[30px] border border-border/70 bg-background/80 p-5 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex items-end gap-4">
                            <Skeleton className="h-28 w-28 rounded-full border-4 border-background sm:h-32 sm:w-32" />
                            <div className="space-y-2 pb-2">
                                <Skeleton className="h-4 w-28 rounded-full" />
                                <Skeleton className="h-9 w-40 rounded-lg" />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Skeleton className="h-10 w-32 rounded-lg" />
                            <Skeleton className="h-10 w-32 rounded-lg" />
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                        <Skeleton className="h-8 w-24 rounded-full" />
                        <Skeleton className="h-8 w-28 rounded-full" />
                    </div>

                    <div className="mt-6 grid gap-3 border-t border-border/70 pt-5 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="rounded-2xl border border-border/60 bg-muted/40 px-4 py-3">
                                <Skeleton className="h-7 w-14 rounded-md" />
                                <Skeleton className="mt-2 h-4 w-20 rounded-md" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <section className="mx-auto mt-14 w-full max-w-5xl">
                <div className="rounded-[28px] border border-border/60 bg-card/70 p-5 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-6">
                    <div className="mb-6 border-b border-border/60 pb-4">
                        <Skeleton className="h-7 w-40 rounded-md" />
                        <Skeleton className="mt-2 h-4 w-52 rounded-md" />
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="overflow-hidden rounded-[22px] border border-border/60 bg-background/80">
                                <Skeleton className="aspect-video w-full" />
                                <div className="space-y-4 p-4">
                                    <Skeleton className="h-5 w-[80%] rounded-md" />
                                    <Skeleton className="h-4 w-[60%] rounded-md" />
                                    <div className="flex gap-2 pt-1">
                                        <Skeleton className="h-7 w-16 rounded-full" />
                                        <Skeleton className="h-7 w-20 rounded-full" />
                                    </div>
                                    <div className="flex gap-4 border-t border-border/60 pt-3">
                                        <Skeleton className="h-3.5 w-12 rounded-md" />
                                        <Skeleton className="h-3.5 w-16 rounded-md" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OverviewLoader;