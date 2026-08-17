import { UseFormReturn } from "react-hook-form";

export interface SignUpForm {
    form: UseFormReturn<{
        username: string;
        email: string;
        password: string;
    }, unknown, {
        username: string;
        email: string;
        password: string;
    }>
}