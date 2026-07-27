import { createResponse, StatusCode } from "@/lib/createResponse";
import { getSuggesstions } from "../repositories/search.repositories";
import { escapeRegex } from "../utils/escapeRegex";
import { dbConnect } from "@/lib/db";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import { rateLimit } from "@/domains/impact/utils/rate_limit";

export async function getSearchSuggesstions({ q, ip }: { q: string | null, ip: string }) {

    if (!q || q.trim().length < 2) {
        return createResponse({
            success: true,
            message: 'Type atleast 2 words',
            data: []
        }, StatusCode.OK)
    }

    const safeQuery = escapeRegex(q)

    const regex = new RegExp("^" + safeQuery, "i");

    await dbConnect();

    const auth = await VerifyUser();

    //Rate limit
    if (auth.user?._id) {
        const global = await rateLimit(
            `rate-impact:user:${auth.user._id}`,
            30,
            60
        );

        if (!global.allowed) {
            return createResponse({
                success: false,
                message: 'Too many requests'
            }, StatusCode.TOO_MANY_REQUESTS)
        }
    } else {
        const global = await rateLimit(
            `rate-impact:user:${ip}`,
            30,
            60
        );

        if (!global.allowed) {
            return createResponse({
                success: false,
                message: 'Too many requests'
            }, StatusCode.TOO_MANY_REQUESTS)
        }
    }

    return await getSuggesstions({ q: regex })
}

