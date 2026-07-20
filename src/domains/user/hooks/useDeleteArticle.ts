import { QueryClient, useMutation } from "@tanstack/react-query";
import { deleteUserArticle } from "../axios/user.axios";
import { toast } from "sonner";

const queryClient = new QueryClient()

export const useDeleteArticle = () => {
    
    const mutation = useMutation({
        mutationFn: (slug: string) => deleteUserArticle(slug),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-blogs"] });
            toast.success("Article deleted successfully!");
        },

        onError: () => toast.error("Failed to delete article"),
    });

    return mutation
}