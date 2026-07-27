
import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import Blog from "@/models/blog_modles/blog.model";

//Get suggestions for user's articles. (my article page)
export async function getUserSearchSuggesstions({ q, userId }: { q: RegExp, userId: string }) {
    try {
       
        await dbConnect();

        const articles = await Blog.find({
            isPublished: true,
            author: userId,
            title: q,
        })
            .select("title slug")
            .limit(8)
            .lean()

        if (articles.length === 0) {
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