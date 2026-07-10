
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../axios/article.axios";

export function useExploreArticles({
    page,
}: {
    page: number;
}) {
    const {
        data,
        isPending,
        isError,
        refetch
    } = useQuery({
        queryKey: ["articles", { page }],
        queryFn: () =>
            getArticles({
                page,
                limit: page === 1 ? 11 : 10,
            }),
    });

    return {
        articles: data,
        isPending,
        isError,
        refetch
    }
}