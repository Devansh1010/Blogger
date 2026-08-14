'use client'

import { useQuery } from "@tanstack/react-query"
import { getSavedArticles } from "../../axios/user.axios"

export const useSavedArticles = (userId: string) => {
    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['user-saved'],
        queryFn: () => getSavedArticles(userId),
    })

    return {
        savedArticle: data,
        isPending,
        isError,
        refetch
    }
}