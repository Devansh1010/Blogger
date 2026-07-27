'use client'

import { useQuery } from "@tanstack/react-query"
import { getMe } from "../../axios/user.axios"

export const useGetUserProfile = (userId: string) => {
    const { data, isPending, isError } = useQuery({
        queryKey: ['user-profile'],
        queryFn: () => getMe(userId),
    })

    return {
        userData: data,
        isPending,
        isError
    }
}