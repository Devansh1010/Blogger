
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { articleFormValidation } from "../validators/article-form";
import { ArticleFormValidation } from "../type";

const defaultValues: ArticleFormValidation = {
    title: "",
    hook: undefined,
    level: "Beginner",
    insights: [],
    tags: [],
    content: {},
    isPublished: false,
    seriesPartOf: undefined,
    coverImage: "",
};

export const useFormSchema = () => {
    const method = useForm<ArticleFormValidation>({
        resolver: zodResolver(articleFormValidation),
        mode: "onSubmit",
        defaultValues,
    });

    return method
}