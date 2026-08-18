import { getSavedArticles } from "@/domains/user/services/profile.services";
import { createResponse, StatusCode } from "@/lib/createResponse";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)

    if (!userId) {
        return createResponse({
            success: false,
            message: "UserId is Required"
        }, StatusCode.BAD_REQUEST)
    }

    return await getSavedArticles(userId, page, limit)
}