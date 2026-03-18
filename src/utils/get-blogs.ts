import blogApi from "@/lib/blogAxios";

export const getBlogs = async () => {
    try {
        const response = await blogApi.get('/get-blogs');
        if (response.status === 200) {
            console.log("Blogs retrieved successfully:", response.data.data)
            return response.data.data;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
    }
}