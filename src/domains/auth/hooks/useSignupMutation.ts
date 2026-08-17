import { signup } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SignUpForm } from "../type";


export const useSignupMutation = ({ form }: SignUpForm) => {

     const router = useRouter();

    return useMutation({
        mutationFn: signup,

        onSuccess: (res) => {
            if (res.success) {
                form.reset();
                router.push("/auth/verifyCode");
            }
        },

        onError: (error) => {
            console.error("Signup error:", error);
        },
    });
}