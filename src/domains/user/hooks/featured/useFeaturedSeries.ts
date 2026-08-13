import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { setFeaturedSeries } from "../../axios/user.axios";


export const useFeaturedSeries = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: setFeaturedSeries,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
            toast.success("Updated Successfully");
        },

        onError: () => toast.error("Failed to Update"),
    });

    return mutation
}