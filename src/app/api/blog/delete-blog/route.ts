import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Blog from "@/models/blog_modles/blog.model";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        //Add verify  User
        const auth = await VerifyUser()

        if (!auth.success) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            )
        }

        const userId = auth.user?._id

        const { title } = await req.json();

        await dbConnect();

        const deletedBlog = await Blog.findOneAndDelete({ title, author: userId })

        if (!deletedBlog) {
            return createResponse({ success: false, message: 'Blog not found' }, StatusCode.NOT_FOUND)
        }

        return createResponse({ success: true, message: 'Blog deleted successfully' }, StatusCode.OK)
    } catch (error) {
        console.error("Error while deleting post:", error)

        return createResponse(
            {
                success: false,
                message: "Internal Server Error",
            },

            StatusCode.INTERNAL_ERROR
        )
    }
}