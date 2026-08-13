import { deleteSeries } from "@/domains/series/axios/series.axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";



const queryClient = new QueryClient()

export const useDeleteSeries = () => {

    const mutation = useMutation({
        mutationFn: (slug: string) => deleteSeries(slug),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["series"] });
            toast.success("Series deleted successfully!");
        },

        onError: () => toast.error("Failed to delete series"),
    });

    return mutation
}