import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import Blog from "@/models/blog_modles/blog.model";
import { NextRequest } from "next/server";

import { createArticle } from "@/domains/article/services/article.services";


export async function POST(req: Request) {

    const body = await req.json();

    return await createArticle(body)

}

export async function GET(req: NextRequest) {
    try {

        const { searchParams } = new URL(req.url);

        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(10, parseInt(searchParams.get("limit") || "10"));

        const skip = (page - 1) * limit;

        await dbConnect()


        const blogs = await Blog.aggregate([
            {
                $match: {
                    isPublished: true,
                },
            },

            {
                $sort: {
                    publishedAt: -1,
                },
            },

            {
                $skip: skip,
            },

            {
                $limit: limit,
            },

            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author",
                },
            },

            {
                $unwind: "$author",
            },

            {
                $project: {
                    slug: 1,
                    title: 1,
                    coverImage: 1,
                    excerpt: 1,
                    hook: 1,
                    insights: 1,
                    level: 1,
                    tags: 1,
                    views: 1,
                    likes: 1,
                    readTime: 1,
                    publishedAt: 1,

                    author: {
                        _id: "$author._id",
                        username: "$author.username",
                        avatar: "$author.avatar",
                    },
                },
            },
        ]);

        const total = await Blog.countDocuments({ isPublished: true });

        //logic to get one featured blog by its maximum views

        const featuredBlog = blogs.length > 0 ? blogs.reduce(
            (prev, current) => (prev.views > current.views) ? prev : current) : null;

        return createResponse(
            {
                success: true, message: "Blogs retrieved successfully", data: {
                    blogs,
                    featuredBlog,
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