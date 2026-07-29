'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { updateUserSchema } from "../../validation";



export const useProfileForm = () => {
    return useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            email: "",
            username: "",
            profileImage: null,

        },
    });
}