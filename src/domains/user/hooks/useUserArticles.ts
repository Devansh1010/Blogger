import { useQuery } from "@tanstack/react-query";
import { getUserArticles } from "../axios/user.axios";
import { ArticleResponse } from "@/domains/article/type";

export function useUserArticles({page}: {page: number}) {

    const { data, isPending, isError, refetch } = useQuery<ArticleResponse>({
        queryKey: ['user-articles', { page }],
        queryFn: () => getUserArticles({ page, limit: 10 }),
    });

    return {
        userArticles: data,
        isPending,
        isError,
        refetch
    }
}