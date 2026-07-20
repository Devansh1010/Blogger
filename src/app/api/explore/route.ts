
import { getSearchSuggesstions } from "@/domains/explore/services/search-suggesstions";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);

    const q = searchParams.get("query");

    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0] ??
        "unknown";

    return await getSearchSuggesstions({ q, ip })
}