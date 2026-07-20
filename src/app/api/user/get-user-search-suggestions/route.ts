
import { getUserSuggesstions } from "@/domains/user/services/search.services";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("query");

    return await getUserSuggesstions({q})
}