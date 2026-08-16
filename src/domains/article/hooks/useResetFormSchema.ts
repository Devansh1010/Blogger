import { useEffect } from "react";
import { ResetFormSchema } from "../type";

export const useResetFormSchema = ({ existingArticle, methods }: ResetFormSchema) => {

    useEffect(() => {
        if (!existingArticle) return;

        methods.reset({
            title: existingArticle.title,
            hook: existingArticle.hook ?? "",
            level: existingArticle.level ?? "Beginner",
            insights: existingArticle.insights ?? [""],
            tags: existingArticle.tags ?? [],
            content: existingArticle.content,
            isPublished: existingArticle.isPublished ?? false,
            seriesPartOf: existingArticle.seriesPartOf ?? "",
            coverImage: existingArticle.coverImage ?? "",
        });

    }, [existingArticle, methods]);

}