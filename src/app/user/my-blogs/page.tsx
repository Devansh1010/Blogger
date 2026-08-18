
import UserArticles from "@/domains/user/components/articles/UserArticles"
import UserSavedArticles from "@/domains/user/components/articles/UserSavedArticles"
import { Suspense } from 'react'

export default function Dashboard({ searchParams }: { searchParams?: { [key: string]: string } }) {

    const showSaved = typeof window === 'undefined'
        ? (searchParams?.saved === 'true')
        : new URLSearchParams(window.location.search).get('saved') === 'true'

    return (
        <div className="max-w-7xl mx-auto py-20">
            {showSaved ? (
                <Suspense>
                    {/* client component will read search params for page */}
                    <UserSavedArticles />
                </Suspense>
            ) : (
                <UserArticles />
            )}
        </div>

    )
}