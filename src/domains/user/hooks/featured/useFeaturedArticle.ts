import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { setFeaturedArticle } from "../../axios/user.axios";
import { AxiosError } from "axios";

export const useFeaturedArticle = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: setFeaturedArticle,

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user-articles"] });
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
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