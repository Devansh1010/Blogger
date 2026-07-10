import { createResponse, StatusCode } from "@/lib/createResponse";
import { getSuggesstions } from "../repositories/search.repositories";

function escapeRegex(text: string) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function getSearchSuggesstions({ q }: { q: string | null }) {

    if (!q || q.trim().length < 2) {
        return createResponse({
            success: true,
            message: 'Type atleast 2 words',
            data: []
        }, StatusCode.OK)
    }

    const safeQuery = escapeRegex(q)

    return await getSuggesstions({ q: safeQuery })
}