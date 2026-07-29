import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db"
import Blog from "@/models/blog_modles/blog.model";
import Series from "@/models/series_models/series.model";
import User from "@/models/user_models/user.model";
import mongoose from "mongoose";

export const fetchUserProfileData = async ({ userId }: { userId: string }) => {
    try {
        await dbConnect();

        const data = await User.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(userId) }
            },

            {
                $lookup: {
                    from: "blogs",
                    let: {
                        ids: {
                            $ifNull: ["$featuredArticles", []]
                        }
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$_id", "$$ids"]
                                }
                            }
                        },
                        {
                            $project: {
                                title: 1,
                                hook: 1,
                                slug: 1,
                                readTime: 1,
                                level: 1,
                                coverImage: 1,
                                tags: 1,
                                views: 1,
                                likes: 1,
                                publishedAt: 1
                            }
                        }
                    ],
                    as: "featuredArticles"
                }
            },

            {
                $project: {
                    username: 1,
                    email: 1,
                    bio: 1,
                    avatar: 1,
                    coverImage: 1,
                    followersCount: 1,
                    followingCount: 1,
                    featuredArticles: 1
                }
            }
        ])

        const blogs = await Blog.find({
            author: userId
        })
        .select('views')
        .lean()

        const seriesCount = await Series.countDocuments({
            author: userId
        })

        const articleCount = blogs?.length ? blogs.length : 0;

        const totalViews = blogs.reduce(
            (acc, blog) => acc += blog.views,
            0
        )

        if (!data || data.length === 0) {
            return createResponse({
                success: false,
                message: "Not found"
            }, StatusCode.NOT_FOUND)
        }


        const userProfile = {
            userProfile: data[0],
            articleCount: articleCount,
            seriesCount: seriesCount,
            totalViews: totalViews
        }

        return createResponse({
            success: true,
            message: "Profile Found",
            data: userProfile
        }, StatusCode.OK)

    } catch (error) {
        console.log(error)
        return createResponse({
            success: false,
            message: "Internal  Error",
        }, StatusCode.NOT_FOUND)
    }
}