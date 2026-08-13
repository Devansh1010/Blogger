
import { getUserSeries } from "@/domains/user/axios/user.axios"
import { useQuery } from "@tanstack/react-query"



export const useGetUserSeries = ({ page, limit }: { page: number, limit?: number }) => {

    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['user-series'],
        queryFn: () => getUserSeries({ page, limit }),
    })

    return {
        userSeries: data,
        isPending,
        isError,
        refetch
    }
}
