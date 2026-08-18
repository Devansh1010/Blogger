import { VerifyUser } from "@/lib/verifyUser/userVerification"
import { fetchSavedArticles, fetchUserProfileData, setUserFeaturedArticle, setUserFeaturedSeries } from "../repositories/profile.repositori";
import { rateLimit } from "@/domains/impact/utils/rate_limit";
import { createResponse, StatusCode } from "@/lib/createResponse";

export const getUserProfile = async ({ userId, ip }: { userId: string, ip: string }) => {

    const { user } = await VerifyUser();

    //rate-limit
    if (user?._id) {
        const global = await rateLimit(
            `rate-profile:user:${userId}`,
            10,
            60
        );

        if (!global.allowed) {
            return createResponse({
                success: false,
                message: 'Too many requests'
            }, StatusCode.TOO_MANY_REQUESTS)
        }
    } else {
        const global = await rateLimit(
            `rate-profile:user:${ip}`,
            10,
            60
        );

        if (!global.allowed) {
            return createResponse({
                success: false,
                message: 'Too many requests'
            }, StatusCode.TOO_MANY_REQUESTS)
        }
    }

    const isOwner: boolean = user?._id?.toString() == userId.toString()

    return await fetchUserProfileData({ userId, isOwner });

};

export const setFeaturedArticle = async (articleId: string) => {

    const { user, success } = await VerifyUser()

    if (!success || !user?._id) {
        return createResponse({
            success: false,
            message: "Unauthorized Aceess"
        }, StatusCode.UNAUTHORIZED)
    }

    const global = await rateLimit(
        `rate-setFeatured:user:${user._id}`,
        20,
        60
    );

    if (!global.allowed) {
        return createResponse({
            success: false,
            message: 'Too many requests'
        }, StatusCode.TOO_MANY_REQUESTS)
    }

    return await setUserFeaturedArticle({ userId: user?._id, articleId })

};

export const setFeaturedSeries = async (seriesId: string) => {

    const { user, success } = await VerifyUser()

    if (!success || !user?._id) {
        return createResponse({
            success: false,
            message: "Unauthorized Aceess"
        }, StatusCode.UNAUTHORIZED)
    }

    const global = await rateLimit(
        `rate-setFeatured:user:${user._id}`,
        20,
        60
    );

    if (!global.allowed) {
        return createResponse({
            success: false,
            message: 'Too many requests'
        }, StatusCode.TOO_MANY_REQUESTS)
    }

    return await setUserFeaturedSeries({ userId: user?._id, seriesId })

};

export const getSavedArticles = async (userId: string, page = 1, limit = 10) => {

    const { user, success } = await VerifyUser()

    if (
        !success ||
        !user?._id ||
        user._id.toString() !== userId.toString()
    ) {
        return createResponse({
            success: false,
            message: "Unauthorized Aceess"
        }, StatusCode.UNAUTHORIZED)
    };

    const global = await rateLimit(
        `rate-savedArticle:user:${user._id}`,
        20,
        60
    );

    if (!global.allowed) {
        return createResponse({
            success: false,
            message: 'Too many requests'
        }, StatusCode.TOO_MANY_REQUESTS)
    }

    return await fetchSavedArticles(userId, page, limit)

}