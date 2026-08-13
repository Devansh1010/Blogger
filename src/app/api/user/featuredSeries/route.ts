import { setFeaturedSeries } from "@/domains/user/services/profile.services";
import { createResponse, StatusCode } from "@/lib/createResponse";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const seriesId = searchParams.get('seriesId')

    if (!seriesId) {
        return createResponse({
            success: false,
            message: 'Series Id is Required'
        }, StatusCode.BAD_REQUEST)
    }

    return await setFeaturedSeries(seriesId)
}