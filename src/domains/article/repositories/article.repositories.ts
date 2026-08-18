import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { generateSlug } from "@/lib/slug-generater";
import Blog from "@/models/blog_modles/blog.model";
import SeriesBlog from "@/models/series_models/series-blog.model";
import Series from "@/models/series_models/series.model";
import User from "@/models/user_models/user.model";
import { WriteArticleProps } from "../type";
import { readTimeAndExcerpt } from "../utils/createArticle";


export const writeArticle = async ({
    title,
    content,
    tags,
    isPublished,
    coverImage,
    seriesPartOf,
    hook,
    insights,
    level,
    author
}: WriteArticleProps) => {
    try {

        await dbConnect();

        // ================= PRE-CHECKS =================
        const existingBlog = await Blog.findOne({
            title: title.trim(),
            author: author
        });

        if (existingBlog) {
            return createResponse(
                { success: false, message: "Blog with same title already exists" },
                StatusCode.BAD_REQUEST
            );
        }

        const user = await User.findById(author).select("username").lean();

        if (!user) {
            return createResponse({ success: false, message: "User not found" }, StatusCode.NOT_FOUND);
        }

        const slug = generateSlug(title);

        const { readTime, excerpt } = readTimeAndExcerpt(content)

        // ================= CREATE BLOG =================
        const newBlog = await Blog.create({
            title,
            hook,
            content,
            slug,
            excerpt,
            seriesPartOf,
            author,
            username: user.username,
            tags,
            coverImage,
            level,
            readTime,
            isPublished,
            insights,
            publishedAt: isPublished ? new Date() : undefined,
        });

        // ================= SERIES =================
        if (seriesPartOf) {
            const seriesExists = await Series.findById(seriesPartOf);

            if (seriesExists) {
                const lastBlog = await SeriesBlog
                    .findOne({ series: seriesPartOf })
                    .sort({ order: -1 });

                const order = lastBlog ? lastBlog.order + 1 : 1;

                await SeriesBlog.create({
                    series: seriesPartOf,
                    blog: newBlog._id,
                    order,
                });
            }
        }

        // ================= Badge awarding =================
                try {
                    // Only award authoring badges when article is published
                    if (isPublished) {
                        // Count only published articles for the author
                        const totalPublishedArticles = await Blog.countDocuments({ author, isPublished: true });

                        const thresholds: { [k: number]: string } = {
                            1: 'first-article',
                            5: 'author-5',
                            10: 'author-10',
                            15: 'author-15'
                        };

                        const badgeId = thresholds[totalPublishedArticles];

                        if (badgeId) {
                            // award via central badge service (enforces uniqueness/maxAwards)
                            const badgeService = await import('@/domains/badges/utils/badgeService');
                            const res = await badgeService.default.awardBadgeToUser(String(author), badgeId);
                            if (!res.success) {
                                console.warn('Badge awarding skipped:', res.message);
                            }
                        }
                    }
                } catch (e) {
                    console.warn('Badge assignment failed', e);
                }

        return createResponse(
            {
                success: true,
                message: "Blog Created Successfully",
                data: newBlog
            },
            StatusCode.CREATED
        );

    } catch (error) {
        console.log(error)
        return createResponse(
            { success: false, message: "Internal Server Error" },
            StatusCode.INTERNAL_ERROR
        );
    }
}