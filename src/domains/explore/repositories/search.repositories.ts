import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import Blog from "@/models/blog_modles/blog.model";

export async function getSuggesstions({ q }: { q: string }) {
    try {
        const regex = new RegExp("^" + q, "i");

        await dbConnect();

        const articles = await Blog.find({
            isPublished: true,
            title: regex,
        })
            .select('title slug')
            .limit(8)
            .lean();

        if (!articles) {
            return createResponse({
                success: false,
                message: 'No suggestions found',

            }, StatusCode.NOT_FOUND)
        }

        return createResponse({
            success: true,
            message: 'found some suggestions',
            data: articles
        }, StatusCode.OK)

    } catch (error) {
        console.log(error)
        return createResponse(
            { success: false, message: "Internal Error Occured while getting Events" },
            StatusCode.INTERNAL_ERROR
        );
    }
}