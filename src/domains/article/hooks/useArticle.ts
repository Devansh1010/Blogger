import { useQuery } from "@tanstack/react-query"
import { getArticle } from "../axios/article.axios"

export const useArticle = (slug?: string) => {

    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['articles', { slug }],
        queryFn: () => getArticle(slug!),
        staleTime: 1000 * 60 * 5,
        enabled: !!slug
    })

    return {
        article: data,
        isArticleFetching: isPending,
        isErrorOccured: isError,
        refetchArticles: refetch
    }
}