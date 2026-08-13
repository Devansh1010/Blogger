import { VerifyUser } from "@/lib/verifyUser/userVerification";
import { fetchUserSeries } from "../repositories/series.repositories"
import { createResponse, StatusCode } from "@/lib/createResponse";

export const getUserSeries = async ({ skip, limit }: { skip: number, limit: number }) => {

    const auth = await VerifyUser();

    if (!auth.success || !auth.user?._id) {
        return createResponse(
            { success: false, message: "Unauthorized" },
            StatusCode.UNAUTHORIZED
        );
    }

    const userId = auth.user._id;

    return await fetchUserSeries({ userId, skip, limit })
}