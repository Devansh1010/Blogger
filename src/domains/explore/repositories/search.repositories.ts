import { createResponse, StatusCode } from "@/lib/createResponse";
import Blog from "@/models/blog_modles/blog.model";
import Series from "@/models/series_models/series.model";
import User from "@/models/user_models/user.model";

//Global search suggestions (explore page)
export async function getSuggesstions({ q }: { q: RegExp }) {
    try {
        
        const [articles, series, users] = await Promise.all([
            Blog.find({
                isPublished: true,
                title: q,
            })
                .select("title slug")
                .limit(8)
                .lean(),

            Series.find({
                isPublished: true,
                title: q,
            })
                .select("title slug")
                .limit(3)
                .lean(),

            User.find({
                username: q,
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