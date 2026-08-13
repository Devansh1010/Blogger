import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Blog from "@/models/blog_modles/blog.model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    
    try {

        const auth = await VerifyUser();

        if (!auth.success || !auth.user?._id) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            );
        }
        const userId = auth.user._id;

        await dbConnect()

        const { searchParams } = new URL(req.url);

        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(20, parseInt(searchParams.get("limit") || "10"));
        const search = searchParams.get("search");
        const skip = (page - 1) * limit;

        const filter = {
            author: userId,
            // Add search condition if search exists
            ...(search && {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { desc: { $regex: search, $options: "i" } }
                ]
            })
        };

        const blogs = await Blog.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select("title desc slug excerpt hook coverImage tags isPublished isFeatured createdAt author readTime level views likes publishedAt")
            .populate("author", "username avatar")
            .lean()

        const total = await Blog.countDocuments(filter);

        return createResponse(
            {
                success: true, message: "Blogs retrieved successfully", data: {
                    blogs,
                    pagination: {
                        total,
                        page,
                        limit,
                        totalPages: Math.ceil(total / limit),
                    },
                }
            },
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