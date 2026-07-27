import { escapeRegex } from "@/domains/explore/utils/escapeRegex"
import { createResponse, StatusCode } from "@/lib/createResponse"
import { getUserSearchSuggesstions } from "../repositories/search.repositories"
import { VerifyUser } from "@/lib/verifyUser/userVerification"
import { rateLimit } from "@/domains/impact/utils/rate_limit"

export async function getUserSuggesstions({ q }: { q: string | null }) {

    if (!q || q.trim().length < 2) {
        return createResponse({
            success: false,
            message: 'Type atleast 2 words',
            data: []
        }, StatusCode.OK)
    }

    const safeQuery = escapeRegex(q)

    const regex = new RegExp("^" + safeQuery, "i");

    const auth = await VerifyUser();

    const userId = auth.user?._id;

    if (!auth.success || !userId) {
        return createResponse(
            { success: false, message: "Unauthorized" },
            StatusCode.UNAUTHORIZED
        );
    }

    //Rate limit

    const global = await rateLimit(
        `rate-search:user:${userId}`,
        30,
        60
    );

    if (!global.allowed) {
        return createResponse({
            success: false,
            message: 'Too many requests'
        }, StatusCode.TOO_MANY_REQUESTS)
    }

    return await getUserSearchSuggesstions({ q: regex, userId })
}