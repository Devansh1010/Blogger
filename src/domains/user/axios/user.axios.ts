import { articleApi } from "@/domains/article/axios/article.axios";
import axios from "axios";

export const userApi = axios.create({
    baseURL: "/api/user",
    withCredentials: true
})

export const getUserArticles = async ({ page, limit, }: { page: number, limit: number }) => {

    const response = await articleApi.get(`/get-user-blogs?page=${page}&limit=${limit}`);

    return response.data.data;

};

export const getUserSeries = async ({ page = 1, limit = 10, }: { page: number, limit?: number }) => {

    const res = await userApi.get(`/get-user-series?page=${page}&limit=${limit}`);

    return res.data.data;
};

export const deleteUserArticle = async (slug: string) => {
    const res = await articleApi.delete(`/${slug}`)

    return res.data
};

export const getUserArticleSuggestions = async ({ search }: { search: string }) => {
    const res = await userApi.get(`/get-user-search-suggestions?query=${search}`)

    return res.data
};

export const getMe = async (userId: string) => {
    const res = await userApi.get(`/me?userId=${userId}`,)

    return res.data.data
};

export const checkUsernameUnique = async (username: string) => {
    const { data } = await axios.get(
        `/api/auth/check-username-unique?username=${username}`
    );

    return data;
};

export const setFeaturedArticle = async (articleId: string) => {
    const res = await userApi.patch(`/featuredArticle?articleId=${articleId}`)

    return res.data
};

export const setFeaturedSeries = async (seriesId: string) => {

    const res = await userApi.patch(`/featuredSeries?seriesId=${seriesId}`)

    return res.data
};

export const getSavedArticles = async (userId: string) => {

    const res = await userApi.get(`/saved/article?userId=${userId}`)

    return res.data.data
}
