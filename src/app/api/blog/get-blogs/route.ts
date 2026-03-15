import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Blog from "@/models/blog_modles/blog.model";

export async function GET() {
    try {
       
        const auth = await VerifyUser()

        if (!auth.success) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            )
        }

        const userId = auth.user?._id

        await dbConnect()
        const blogs = await Blog.find({ author: userId })
            .select("title slug excerpt coverImage tags isPublished createdAt")
            .sort({ createdAt: -1 })
            .lean()

        return createResponse(
            { success: true, message: "Blogs retrieved successfully", data: blogs },
            StatusCode.OK
        )
    } catch (error) {
        console.error("Error getting blogs:", error)

        return createResponse(
            {
                success: false,
                message: "Internal Server Error",
            },
            StatusCode.INTERNAL_ERROR
        )
    }
}