import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function Loading() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-20 bg-background">

            {/* 1. MATCHING HEADER SECTION */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div className="space-y-4">
                    {/* Badge Skeleton */}
                    <Skeleton className="h-6 w-20 rounded-md border border-primary/10" />
                    <div className="space-y-2">
                        {/* Matching the 5xl/7xl H1 */}
                        <Skeleton className="h-14 w-64 md:h-20 md:w-125" />
                    </div>
                </div>

                {/* Premium Search Bar Skeleton (No rounded-md, just bottom border) */}
                <div className="w-full md:w-72 h-10 border-b border-muted flex items-center">
                    <Skeleton className="h-4 w-4 rounded-full ml-3 mr-4" /> {/* Search Icon */}
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>

            {/* 2. MATCHING FEATURED HERO */}
            <section className="mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7">
                        {/* Aspect Video for Hero Image */}
                        <Skeleton className="aspect-video w-full rounded-2xl" />
                    </div>

                    <div className="lg:col-span-5 space-y-6">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-10 w-full" /> {/* Title Line 1 */}
                        <Skeleton className="h-10 w-3/4" />    {/* Title Line 2 */}
                        <div className="space-y-2 pt-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-[90%]" />
                        </div>
                        {/* Author Section */}
                        <div className="flex items-center gap-4 pt-6">
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Separator className="mb-16 opacity-50" />

            {/* 3. MATCHING REGULAR FEED (Rows) */}
            <div className="space-y-20">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        {/* Left: Aspect 4/3 Image */}
                        <div className="md:col-span-4">
                            <Skeleton className="aspect-4/3 w-full rounded-xl" />
                        </div>

                        {/* Right: Content Side */}
                        <div className="md:col-span-8 flex flex-col h-full py-2 space-y-4">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <Skeleton className="h-8 w-3/4" /> {/* Title */}
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-[85%]" />
                            </div>
                            {/* Bottom Row */}
                            <div className="mt-auto pt-6 flex justify-between items-center">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}