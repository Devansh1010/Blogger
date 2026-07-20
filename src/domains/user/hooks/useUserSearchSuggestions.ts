import { useQuery } from "@tanstack/react-query";
import { getUserArticleSuggestions } from "../axios/user.axios";

export function useUserSearchSuggestions({ search }: { search: string }) {

    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['user-articles-suggestions', { search }],
        queryFn: () => getUserArticleSuggestions({ search }),
    });

    return {
        suggestions: data,
        isPending,
        isError,
        refetch
    }
}