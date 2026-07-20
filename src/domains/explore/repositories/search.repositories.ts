import { rateLimit } from "@/domains/impact/utils/rate_limit";
import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Blog from "@/models/blog_modles/blog.model";
import Series from "@/models/series_models/series.model";
import User from "@/models/user_models/user.model";

//Global search suggestions (explore page)
export async function getSuggesstions({ q, ip }: { q: string, ip: string }) {
    try {
        const regex = new RegExp("^" + q, "i");

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

        const [articles, series, users] = await Promise.all([
            Blog.find({
                isPublished: true,
                title: regex,
            })
                .select("title slug")
                .limit(8)
                .lean(),

            Series.find({
                isPublished: true,
                title: regex,
            })
                .select("title slug")
                .limit(3)
                .lean(),

            User.find({
                username: regex,
            })
                .select("username")
                .limit(3)
                .lean(),
        ]);

        if (
            articles.length === 0 &&
            series.length === 0 &&
            users.length === 0
        ) {
            return createResponse(
                {
                    success: false,
                    message: "No suggestions found",
                },
                StatusCode.NOT_FOUND
            );
        }

        const suggestions = {

            articles: articles.map((a) => ({
                ...a,
                type: "article",
            })),

            series: series.map((s) => ({
                ...s,
                type: "series",
            })),

            users: users.map((u) => ({
                ...u,
                type: "user",
            })),
        }

        return createResponse(
            {
                success: true,
                message: "Suggestions found",
                data: suggestions
            },
            StatusCode.OK
        );

    } catch (error) {
        console.log(error)
        return createResponse(
            { success: false, message: "Internal Error Occured while getting Suggestions" },
            StatusCode.INTERNAL_ERROR
        );
    }
}