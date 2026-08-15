import adminApi from "@/lib/axios/adminAxios";
import axios from "axios"
import { ArticleFormValidation, GetArticleParams } from "../type";

export const articleApi = axios.create({
    baseURL: "/api/blog",
    withCredentials: true
})


// Fetch Tags
export const getTags = async () => {

    const res = await adminApi.get(``);

    return res.data.data.categories;

}

export async function getArticle(slug: string) {
    const response = await articleApi.get(`/${slug}`);

    return response.data.data;
}

export const getArticles = async ({
    page,
    tag,
    q,
    limit
}: GetArticleParams) => {

    const response = await articleApi.get(`?page=${page}&tag=${tag}&q=${q}&limit=${limit}`);

    return response.data.data
}

export const createArticle = async (data: ArticleFormValidation) => {
    const res = await articleApi.post("", data);

    return res.data
};

export const updateArticle = async (data: ArticleFormValidation, slug?: string) => {

    const res = await articleApi.patch(`/${slug}`, data)

    return res.data

}