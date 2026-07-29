import { updateProfile } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { ProfileFormValues } from "../../validation";



export const useProfileFromMutation = (
    form: UseFormReturn<ProfileFormValues>
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
            toast.success("Profile updated Successfully");
            form.reset();
        },
        onError: () => toast.error("Failed to Update Profile"),
    });

    return mutation
}