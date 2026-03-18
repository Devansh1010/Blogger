import blogApi from "@/lib/blogAxios";
import { OutputData } from "@editorjs/editorjs";

export const createBlog = async (title: string, content: OutputData, isPublished: boolean) => {
    try {
        const res = await blogApi.post("/create-blog", {
            title,
            content,
            isPublished,
        })

        if(res.data.success) {
            return res.data
        }
    } catch (error) {
        console.error("Failed to create blog", error)
        throw new Error("Failed to create blog")
    }
}