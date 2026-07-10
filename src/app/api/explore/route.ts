import { getSearchSuggesstions } from "@/domains/explore/services/search-suggesstions.ts";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);

    const q = searchParams.get("query");

    return await getSearchSuggesstions({q})
}