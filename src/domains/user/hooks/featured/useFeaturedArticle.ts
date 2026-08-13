import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { setFeaturedArticle } from "../../axios/user.axios";

export const useFeaturedArticle = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: setFeaturedArticle,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-articles"] });
            toast.success("Updated Successfully");
        },

        onError: () => toast.error("Failed to Update"),
    });

    return mutation
}