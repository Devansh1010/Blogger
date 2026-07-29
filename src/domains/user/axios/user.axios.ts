import { articleApi } from "@/domains/article/axios/article.axios";
import axios from "axios";

export const userApi = axios.create({
    baseURL: "/api/user",
    withCredentials: true
})

export const getUserArticles = async ({ page, limit, }: { page: number, limit: number }) => {

    const response = await articleApi.get(`/get-user-blogs?page=${page}&limit=${limit}`);

    return response.data.data;

}

export const deleteUserArticle = async (slug: string) => {
    const res = await articleApi.delete(`/${slug}`)

    return res.data
}

export const getUserArticleSuggestions = async ({ search }: { search: string }) => {
    const res = await userApi.get(`/get-user-search-suggestions?query=${search}`)

    return res.data
}

export const getMe = async (userId: string) => {
    const res = await userApi.get(`/me?userId=${userId}`,)

    return res.data.data
}

export const checkUsernameUnique = async (username: string) => {
    const { data } = await axios.get(
        `/api/auth/check-username-unique?username=${username}`
    );

    return data;
};