import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Blog from "@/models/blog_modles/blog.model";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

export async function GET(
    req: NextRequest,
    { params }: { params: { blogId: string } }
) {
    try {
        const { blogId } = params

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return createResponse(
                { success: false, message: "Invalid Blog ID" },
                StatusCode.BAD_REQUEST
            )
        }

        const auth = await VerifyUser()

        if (!auth.success) return auth.response

        const userId = auth.user?.id
        if (!userId) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            )
        }

        await dbConnect()

        const blog = await Blog.findOne({
            _id: blogId,
            author: userId
        }).populate("author", "name email")

        if (!blog) {
            return createResponse(
                { success: false, message: "Blog not found" },
                StatusCode.NOT_FOUND
            )
        }

        return createResponse(
            { success: true, message: "Blog retrieved successfully", data: blog },
            StatusCode.OK
        )

    } catch (error) {
        console.error("Error getting blog:", error)

        return createResponse(
            {
                success: false,
                message: "Internal Server Error",
            },
            StatusCode.INTERNAL_ERROR
        )
    }
}