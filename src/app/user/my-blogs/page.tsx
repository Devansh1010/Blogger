
import UserArticles from "@/domains/user/components/articles/UserArticles"
import Link from 'next/link'

export default function Dashboard() {
    return (
        <div className="max-w-7xl mx-auto py-20">
            <header className="mb-8 px-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif font-bold leading-tight text-foreground md:text-5xl">My Content</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Manage your articles and saved content.</p>
                    </div>

                    <nav className="ml-4 flex rounded-full bg-muted/30 p-1">
                        <Link href="/user/my-blogs" className={`px-4 py-2 text-sm font-medium rounded-full bg-background text-foreground shadow-sm`}>
                            My Articles
                        </Link>

                        <Link href="/user/saved-articles" className={`px-4 py-2 text-sm font-medium rounded-full text-muted-foreground hover:bg-muted`}>
                            Saved Articles
                        </Link>
                    </nav>
                </div>
            </header>

            <main>
                <UserArticles />
            </main>
        </div>
    )
}