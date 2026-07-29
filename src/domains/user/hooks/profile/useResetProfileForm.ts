import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { UserData } from "../../type";
import { ProfileFormValues } from "../../validation";


export const useResetProfileForm = (
    form: UseFormReturn<ProfileFormValues>,
    data?: UserData
) => {
    useEffect(() => {
        if (!data) return;

        form.reset({
            username: data.username ?? "",
            email: data.email ?? "",
            profileImage: {
                url: data.avatar ?? "",
            },
            coverImage: {
                url: data.coverImage ?? "",
            }
        });
    }, [data, form]);
};