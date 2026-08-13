import { createResponse, StatusCode } from "@/lib/createResponse"
import { dbConnect } from "@/lib/db"
import Series from "@/models/series_models/series.model"
import mongoose from "mongoose"

export const fetchUserSeries = async ({ userId, skip, limit }: { userId: string, skip: number, limit: number }) => {

    try {

        await dbConnect()

        const userSeries = await Series.aggregate([
            { $match: { author: new mongoose.Types.ObjectId(userId) } },

            {
                $skip: skip
            },

            {
                $limit: limit

            },

            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author'
                }
            },

            { $unwind: { path: '$author' } },

            {
                $project: {
                    slug: 1,
                    title: 1,
                    desc: 1,
                    coverImage: 1,
                    tags: 1,
                    views: 1,
                    publishedAt: 1,
                    isPublished: 1,
                    blogs: 1,
                    author: {
                        _id: "$author._id",
                        username: "$author.username",
                        avatar: "$author.avatar",
                    },
                },
            }

        ])

        if (!userSeries) {
            return createResponse(
                {
                    success: false,
                    message: "Didn't find any series",
                },
                StatusCode.OK
            )

        }

        return createResponse(
            {
                success: true,
                message: 'Find Some Series(s)',
                data: userSeries || []
            },
            StatusCode.OK
        )

    } catch (error) {
        console.error('Error Finding User Series:', error)
        return createResponse(
            {
                success: false,
                message: 'Error Finding User Series',
                error: {
                    code: '500',
                    message: 'Internal Server Error',
                },
            },
            StatusCode.INTERNAL_ERROR
        )
    }
}