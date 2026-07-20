import { createResponse, StatusCode } from "@/lib/createResponse";
import { getSuggesstions } from "../repositories/search.repositories";
import { escapeRegex } from "../utils/escapeRegex";

export async function getSearchSuggesstions({ q, ip }: { q: string | null, ip: string }) {

    if (!q || q.trim().length < 2) {
        return createResponse({
            success: true,
            message: 'Type atleast 2 words',
            data: []
        }, StatusCode.OK)
    }

    const safeQuery = escapeRegex(q)

    return await getSuggesstions({ q: safeQuery, ip })
}

