import { escapeRegex } from "@/domains/explore/utils/escapeRegex"
import { createResponse, StatusCode } from "@/lib/createResponse"
import { getUserSearchSuggesstions } from "../repositories/search.repositories"

export async function getUserSuggesstions({ q }: { q: string | null }) {

    if (!q || q.trim().length < 2) {
        return createResponse({
            success: false,
            message: 'Type atleast 2 words',
            data: []
        }, StatusCode.OK)
    }

    const safeQuery = escapeRegex(q)

    return await getUserSearchSuggesstions({ q: safeQuery })
}