import { signInSchema } from "@/lib/schemas/auth/signUpSchema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import z from "zod";

export const useLoginMutation = () => {
      const router = useRouter()

    return useMutation({
        mutationFn: async (data: z.infer<typeof signInSchema>) => {
            const result = await signIn("credentials", {
                identifier: data.identifier,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                throw new Error("The email or password you entered is incorrect.");
            }

            return result;
        },

        onSuccess: () => {
            router.push("/user/explore");
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });
}