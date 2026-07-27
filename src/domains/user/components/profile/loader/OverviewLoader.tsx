import { Skeleton } from '@/components/ui/skeleton'

const OverviewLoader = () => {
    return (
        <div className="space-y-8">
            {/* Cover */}
            <Skeleton className="h-56 w-full rounded-xl" />

            {/* Profile */}
            <div className="-mt-16 flex flex-col items-center">
                <Skeleton className="h-32 w-32 rounded-full border-4" />

                <Skeleton className="mt-4 h-8 w-56" />

                <Skeleton className="mt-2 h-5 w-36" />

                <div className="mt-6 flex gap-8">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-28" />
                </div>

                <Skeleton className="mt-6 h-10 w-32 rounded-md" />
            </div>
        </div>
    )
}

export default OverviewLoader