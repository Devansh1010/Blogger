import { useQuery } from "@tanstack/react-query"
import { getSearchSuggestions } from "../axios/explore.axios"

export const useSearchSuggestions = ({ query }: { query: string }) => {

    const { data, isPending, isError } = useQuery({
        queryKey: ['suggestions', { query }],
        queryFn: () => getSearchSuggestions({ query }),
    })

    return {
        suggestions: data,
        isPending,
        isError
    }
}