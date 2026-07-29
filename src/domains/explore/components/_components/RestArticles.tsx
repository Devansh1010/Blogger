
import { useExploreArticles } from '@/domains/article/hooks/useExploreArticles';
import { BlogsGridSkeleton } from '../loader/ArticleGridSkeleton';
import { ArticleListError } from '../error/ListArticleError';
import ArticleListPage from '@/domains/article/components/blog_page/ArticleListPage';

const RestArticles = ({ page }: { page: number }) => {
    const {
        articles,
        isPending,
        isError,
        refetch
    } = useExploreArticles({ page });

    if (isPending) return <BlogsGridSkeleton />

    if (isError) return <ArticleListError reset={refetch} />

    return (

        <ArticleListPage
            title={''}
            articles={articles.blogs}
        />
    )
}

export default RestArticles