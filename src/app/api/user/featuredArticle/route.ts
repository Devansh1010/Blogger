import { setFeaturedArticle } from "@/domains/user/services/profile.services";
import { createResponse, StatusCode } from "@/lib/createResponse";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const articleId = searchParams.get('articleId')

    if (!articleId) {
        return createResponse({
            success: false,
            message: 'Article Id is Required'
        }, StatusCode.BAD_REQUEST)
    }

    return await setFeaturedArticle(articleId)
}