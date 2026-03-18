import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Blog from "@/models/blog_modles/blog.model";
import User from "@/models/user_models/user.model";

export const getBlog = async (slug: string) => {
    try {

        const auth = await VerifyUser()

        if (!auth.success) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            )
        }

        await dbConnect()

        let userId = null
        //User can be either from session or from database based on email, this is to handle the case when user is not fully logged in but has email in session
        if (auth.user?._id) {
            userId = auth.user._id.toString()
        } else {
            const user = await User.findOne(
                { email: auth.user?.email },
            ).select("_id username")

            if (!user) {
                return createResponse(
                    { success: false, message: "User not found" },
                    StatusCode.NOT_FOUND
                )
            }

            userId = user._id.toString()
        }

        const blog = await Blog.findOne({
            author: userId,
            slug: slug
        })
            .select("title slug excerpt coverImage tags isPublished createdAt author")
            .populate("author", "username")
            .sort({ createdAt: -1 })
            .lean()

        return blog ? JSON.parse(JSON.stringify(blog)) : null;


    } catch (error) {
        console.error("Error getting blog:", error);
        return null;
    }
}