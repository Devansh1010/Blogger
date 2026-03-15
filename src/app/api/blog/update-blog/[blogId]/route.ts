import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { generateSlug } from "@/lib/slug-generater";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Blog from "@/models/blog_modles/blog.model";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {
  try {
    const { blogId } = params

    const { title, content, tags, isPublished, coverImage } =
      await req.json()

    const auth = await VerifyUser()

    if (!auth.success) {
      return createResponse(
        { success: false, message: "Unauthorized" },
        StatusCode.UNAUTHORIZED
      )
    }

    const userId = auth.user?._id


    await dbConnect()

    const blog = await Blog.findById(blogId)

    if (!blog) {
      return createResponse(
        { success: false, message: "Blog not found" },
        StatusCode.NOT_FOUND
      )
    }

    // ownership check
    if (blog.author.toString() !== userId) {
      return createResponse(
        { success: false, message: "Forbidden" },
        StatusCode.FORBIDDEN
      )
    }

    // update title
    if (title && title !== blog.title) {
      blog.title = title
      blog.slug = generateSlug(title)
    }

    // update content
    if (content?.blocks?.length) {
      blog.content = content

      const firstBlock = content.blocks.find(
        (b: { type: string }) => b.type === "paragraph"
      )

      blog.excerpt = firstBlock?.data?.text?.slice(0, 150) ?? ""
    }

    // update cover image
    if (coverImage) {
      blog.coverImage = coverImage
    }

    // update tags
    if (tags) {
      blog.tags = Array.isArray(tags) ? tags : []
    }

    // publishing logic
    if (typeof isPublished === "boolean") {
      blog.isPublished = isPublished

      if (isPublished && !blog.publishedAt) {
        blog.publishedAt = new Date()
      }

      if (!isPublished) {
        blog.publishedAt = undefined
      }
    }

    await blog.save()

    return createResponse(
      {
        success: true,
        message: "Blog Updated Successfully",
        data: blog
      },
      StatusCode.OK
    )
  } catch (error: unknown) {
    console.error("Error updating blog:", error)

    return createResponse(
      {
        success: false,
        message: "Internal Server Error",
      },
      StatusCode.INTERNAL_ERROR
    )
  }
}