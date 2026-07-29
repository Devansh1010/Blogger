import { useQuery } from "@tanstack/react-query";
import { getUserArticles } from "../axios/user.axios";


export function useUserArticles({page}: {page: number}) {

    const { data, isPending, isError, refetch } = useQuery({
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