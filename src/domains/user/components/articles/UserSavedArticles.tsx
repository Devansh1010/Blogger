'use client'

import { useState } from 'react'
import { PaginationUI } from '@/components/features/series/components/PaginationUi'
import ArticleCard from '@/domains/article/components/blog_page/_components/ArticleCard'
import { useSavedArticles } from '@/domains/user/hooks/profile/useSavedArticles'
import { useSearchParams } from 'next/navigation'
import UserSavedArticlesSkeleton from './loader/UserSavedArticlesSkeleton'
import { Article } from '@/domains/article/type'

const UserSavedArticles = () => {
  const searchParams = useSearchParams()
  const initialPage = parseInt((searchParams?.get('page') ?? '1'), 10)
  const [page, setPage] = useState<number>(initialPage || 1)

  // Assuming userId is current logged in user; verifyUser ensures ownership on server
  // The frontend keeps userId empty string because backend verifies session
  const userId = searchParams?.get('userId') || ''

  const { savedArticle, isPending, isError, } = useSavedArticles(userId, page, 10)

  if (isPending) return <UserSavedArticlesSkeleton />
  if (isError) return <div className="mx-auto max-w-7xl px-6 py-8">Error loading saved articles</div>

  const articles = savedArticle?.articles ?? []
  const pagination = savedArticle?.pagination ?? { totalPages: 1 }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <header className="mb-8 rounded-[28px] border border-border/60 bg-card/70 p-5 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-6">
        <div>
          <h1 className="text-3xl font-serif font-bold leading-tight text-foreground md:text-5xl">Saved Articles</h1>
          <p className="mt-2 text-sm text-muted-foreground">Articles you have saved for later.</p>
        </div>
      </header>

      <main className="min-h-80">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article: Article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </main>

      <footer className="mt-12 flex flex-col items-center gap-6 border-t border-border/40 pt-12">
        <PaginationUI
          page={page}
          totalPages={pagination.totalPages || 1}
          onPageChange={(newPage) => {
            setPage(newPage)
            // update url
            const url = new URL(window.location.href)
            url.searchParams.set('saved', 'true')
            url.searchParams.set('page', String(newPage))
            window.history.replaceState({}, '', url.toString())
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      </footer>
    </div>
  )
}

export default UserSavedArticles
