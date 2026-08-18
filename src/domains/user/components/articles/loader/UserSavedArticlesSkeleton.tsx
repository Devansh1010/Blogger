import { Skeleton } from '@/components/ui/skeleton'

export function UserSavedArticlesSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8 rounded-[28px] border border-border/60 bg-card/70 p-5 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-6">
        <Skeleton className="h-8 w-40 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-[24px] border border-border/60 bg-card/80 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)]">
            <Skeleton className="aspect-video w-full" />

            <div className="space-y-4 p-4">
              <Skeleton className="h-5 w-[85%] rounded-md" />
              <Skeleton className="h-4 w-[60%] rounded-md" />

              <div className="flex items-center gap-2 pt-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>

              <div className="flex items-center gap-4 border-t border-border/60 pt-3">
                <Skeleton className="h-3.5 w-12 rounded-md" />
                <Skeleton className="h-3.5 w-16 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserSavedArticlesSkeleton
