import { createResponse, StatusCode } from "@/lib/createResponse";
import { VerifyUser } from "@/lib/verifyUser/userVerification";

import { writeArticle } from "../repositories/article.repositories";
import { WriteArticleProps } from "../type";




export const createArticle = async ({
    title,
    content,
    tags,
    isPublished,
    coverImage,
    seriesPartOf,
    hook,
    insights,
    level
}: WriteArticleProps) => {


    const auth = await VerifyUser();

    if (!auth.success || !auth.user?._id) {
        return createResponse(
            { success: false, message: "Unauthorized" },
            StatusCode.UNAUTHORIZED
        );
    }

    const userId = auth.user._id;


    if (!title?.trim()) {
        return createResponse(
            { success: false, message: "Title is required" },
            StatusCode.BAD_REQUEST
        );
    }

    const validatedTags = Array.isArray(tags) ? tags : [];

    return await writeArticle({
        title: title.trim(),
        content,
        tags: validatedTags,
        isPublished,
        coverImage,
        seriesPartOf,
        hook: hook?.trim(),
        insights,
        level,
        author: userId
    })
}