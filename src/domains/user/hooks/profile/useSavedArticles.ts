'use client'

import { useQuery } from "@tanstack/react-query"
import { getSavedArticles } from "../../axios/user.axios"

export const useSavedArticles = (userId: string, page = 1, limit = 10) => {
    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['user-saved', { userId, page }],
        queryFn: () => getSavedArticles(userId, page, limit),
    })

    return {
        savedArticle: data,
        isPending,
        isError,
        refetch
    }
}