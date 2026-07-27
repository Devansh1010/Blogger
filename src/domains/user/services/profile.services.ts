import { VerifyUser } from "@/lib/verifyUser/userVerification"
import { fetchUserProfileData } from "../repositories/profile.repositori";
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

    return await fetchUserProfileData({ userId });

}