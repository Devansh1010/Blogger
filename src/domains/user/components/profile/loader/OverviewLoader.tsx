import { Skeleton } from "@/components/ui/skeleton";

const OverviewLoader = () => {
    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col space-y-12 p-8">

            {/* Cover */}
            <Skeleton className="h-56 w-full rounded-xl" />

            {/* Hero */}
            <div className="-mt-16 flex flex-col items-center">
                <Skeleton className="h-32 w-32 rounded-full border-4" />

                <Skeleton className="mt-4 h-8 w-56" />

                <Skeleton className="mt-2 h-5 w-36" />

                <div className="mt-6 flex gap-8">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-28" />
                </div>

                <Skeleton className="mt-6 h-10 w-36 rounded-md" />
            </div>

            {/* Latest Articles */}
            <section className="w-full space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-44" />
                        <Skeleton className="h-4 w-64" />
                    </div>

                    <Skeleton className="h-9 w-24 rounded-md" />
                </div>

                <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            className="h-[420px] w-full rounded-xl"
                        />
                    ))}
                </div>
            </section>

            {/* Featured Articles + Series */}
            <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">

                {/* Featured Articles */}
                <section className="w-full space-y-6 rounded-xl border p-8">

                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <Skeleton className="h-7 w-48" />
                            <Skeleton className="h-4 w-64" />
                        </div>

                        <Skeleton className="h-9 w-24 rounded-md" />
                    </div>

                    <div className="space-y-6">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <Skeleton
                                key={i}
                                className="h-[380px] w-full rounded-xl"
                            />
                        ))}
                    </div>

                </section>

                {/* Series */}
                <section className="w-full space-y-6 rounded-xl border p-8">

                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <Skeleton className="h-7 w-32" />
                            <Skeleton className="h-4 w-56" />
                        </div>

                        <Skeleton className="h-9 w-24 rounded-md" />
                    </div>

                    <div className="space-y-6">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <Skeleton
                                key={i}
                                className="h-[360px] w-full rounded-xl"
                            />
                        ))}
                    </div>

                </section>

            </div>

        </div>
    );
};

export default OverviewLoader;