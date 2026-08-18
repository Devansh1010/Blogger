import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { setFeaturedSeries } from "../../axios/user.axios";
import { AxiosError } from "axios";


export const useFeaturedSeries = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: setFeaturedSeries,

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
            queryClient.invalidateQueries({ queryKey: ["user-series"] });
            toast.success(data?.message ?? "Updated Successfully");
        },

        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(
                error.response?.data?.message ?? "Failed to update"
            );
        },
    });

    return mutation
}