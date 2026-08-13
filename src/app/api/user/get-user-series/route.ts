
import { getUserSeries } from '@/domains/series/services/series.services';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);

    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    const page = Number(pageParam);
    const limit = Number(limitParam);

    const currentPage =
        Number.isInteger(page) && page > 0 ? page : 1;

    const currentLimit =
        Number.isInteger(limit) && limit > 0 ? limit : 10;

    const skip = (currentPage - 1) * currentLimit;

    return await getUserSeries({ skip, limit })
}