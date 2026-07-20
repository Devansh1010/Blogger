import { useQuery } from "@tanstack/react-query"
import { getSearchSuggestions } from "../axios/explore.axios"

export const useSearchSuggestions = ({ query }: { query: string }) => {

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['user-suggestions', { query }],
        queryFn: () => getSearchSuggestions({ query }),
    })

    return {
        suggestions: data,
        isPending,
        isError,
        error
    }
}