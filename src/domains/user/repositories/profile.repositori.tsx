import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db"
import Blog from "@/models/blog_modles/blog.model";
import Series from "@/models/series_models/series.model";
import User from "@/models/user_models/user.model";
import mongoose, { Types } from "mongoose";

export const fetchUserProfileData = async ({ userId, isOwner }: { userId: string, isOwner: boolean }) => {
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
                $lookup: {
                    from: "series",
                    let: {
                        ids: {
                            $ifNull: ["$featuredSeries", []]
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
                                coverImage: 1,
                                tags: 1,
                                publishedAt: 1
                            }
                        }
                    ],
                    as: "featuredSeries"
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
                    featuredArticles: 1,
                    featuredSeries: 1
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
            totalViews: totalViews,
            isOwner: isOwner
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

export const setUserFeaturedArticle = async ({ articleId, userId }: { articleId: string, userId: string }) => {

    try {
        await dbConnect()

        const user = await User.findById(userId)
            .select("featuredArticles")
            .lean();

        if (!user) {
            return createResponse({
                success: false,
                message: 'User not found'
            }, StatusCode.BAD_REQUEST)
        }

        const isAuthor = await Blog.findById(articleId)
            .select('author')
            .lean()

        if (isAuthor.author?.toString() !== userId.toString()) {
            return createResponse({
                success: false,
                message: "Unauthorized"
            }, StatusCode.UNAUTHORIZED)
        }

        const isExist = user.featuredArticles?.filter((article: Types.ObjectId) => article.toString() == articleId.toString())

        if (isExist.length == 0) {

            if (user.featuredArticles?.length >= 2) {

                return createResponse({
                    success: false,
                    message: "You can feature only 2 articles."
                }, StatusCode.BAD_REQUEST)
            }

            const updated = await User.updateOne(
                { _id: userId },
                {
                    $addToSet: {
                        featuredArticles: articleId,
                    },
                }
            );

            const featured = await Blog.findByIdAndUpdate(
                articleId,
                {
                    $set: {
                        isFeatured: true,
                    },
                },
                {
                    new: true,
                }
            ).lean();

            if (!updated || !featured) {
                return createResponse({
                    success: false,
                    message: "Article not be Featured"
                }, StatusCode.BAD_REQUEST)
            }

            return createResponse({
                success: true,
                message: "Article is Featuring"
            }, StatusCode.OK)

        } else {

            const updated = await User.updateOne(
                { _id: userId },
                {
                    $pull: {
                        featuredArticles: articleId,
                    },
                }
            );

            await Blog.findByIdAndUpdate(articleId,
                { isFeatured: false }
            )


            if (!updated) {
                return createResponse({
                    success: false,
                    message: "Article not be Unfeatured"
                }, StatusCode.BAD_REQUEST)
            }

            return createResponse({
                success: true,
                message: "Article is removed from featured now"
            }, StatusCode.OK)
        }

    } catch (error) {
        console.log(error)
        return createResponse({
            success: false,
            message: "Internal Error Occured"
        }, StatusCode.INTERNAL_ERROR)
    }
}

export const setUserFeaturedSeries = async ({ seriesId, userId }: { seriesId: string, userId: string }) => {

    try {
        await dbConnect()

        const user = await User.findById(userId)
            .select("featuredSeries")
            .lean();

        if (!user) {

            return createResponse({
                success: false,
                message: 'User not found'
            }, StatusCode.BAD_REQUEST)
        }

        const isAuthor = await Series.findById(seriesId)
            .select('author')
            .lean()

        if (!isAuthor) {
            return createResponse({
                success: false,
                message: "Series not found"
            }, StatusCode.BAD_REQUEST)
        }

        if (isAuthor.author?.toString() !== userId.toString()) {
            return createResponse({
                success: false,
                message: "Unauthorized"
            }, StatusCode.UNAUTHORIZED)
        }

        const isExist = user.featuredSeries?.filter((series: Types.ObjectId) => series.toString() == seriesId.toString())


        if (isExist?.length == 0 || !isExist) {

            if (user.featuredSeries?.length >= 2) {
                return createResponse({
                    success: false,
                    message: "You can feature only 2 series."
                }, StatusCode.BAD_REQUEST)
            }

            const updated = await User.updateOne(
                { _id: userId },
                {
                    $addToSet: {
                        featuredSeries: seriesId,
                    },
                }
            );

            const featured = await Series.findByIdAndUpdate(
                seriesId,
                {
                    $set: {
                        isFeatured: true,
                    },
                },
                {
                    new: true,
                }
            ).lean();

            if (!updated || !featured) {
                return createResponse({
                    success: false,
                    message: "Series not be Featured"
                }, StatusCode.BAD_REQUEST)
            }

            return createResponse({
                success: true,
                message: "Series is Featuring"
            }, StatusCode.OK)

        } else {

            const updated = await User.updateOne(
                { _id: userId },
                {
                    $pull: {
                        featuredSeries: seriesId,
                    },
                }
            );

            await Blog.findByIdAndUpdate(seriesId,
                { isFeatured: false }
            )

            if (!updated) {
                return createResponse({
                    success: false,
                    message: "Series not be Unfeatured"
                }, StatusCode.BAD_REQUEST)
            }

            return createResponse({
                success: true,
                message: "Series is removed from featured now"
            }, StatusCode.OK)
        }

    } catch (error) {
        console.log(error)
        return createResponse({
            success: false,
            message: "Internal Error Occured"
        }, StatusCode.INTERNAL_ERROR)
    }
}