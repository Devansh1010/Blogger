import { rateLimit } from "@/domains/impact/utils/rate_limit";
import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Blog from "@/models/blog_modles/blog.model";

//Get suggestions for user's articles. (my article page)
export async function getUserSearchSuggesstions({ q }: { q: string }) {
    try {
        const regex = new RegExp("^" + q, "i");

        await dbConnect();

        const auth = await VerifyUser();

        if (!auth.success || !auth.user?._id) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            );
        }

        //Rate limit

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

        const articles = await Blog.find({
                isPublished: true,
                author: auth.user._id,
                title: regex,
            })
                .select("title slug")
                .limit(8)
                .lean()

        if ( articles.length === 0 ) {
            return createResponse(
                {
                    success: false,
                    message: "No suggestions found",
                },
                StatusCode.NOT_FOUND
            );
        }
        
        return createResponse(
            {
                success: true,
                message: "Suggestions found",
                data: {
                    articles: articles
                }
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