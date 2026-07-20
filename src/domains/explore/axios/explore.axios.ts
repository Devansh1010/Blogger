import axios from "axios";
import { toast } from "sonner";

const exploreApi = axios.create({
    baseURL: '/api/explore',
    withCredentials: true
})

exploreApi.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 429) {
            toast.error("Too many requests. Please try again later.");
        }

        return Promise.reject(error);
    }
);

export const getSearchSuggestions = async ({ query }: { query: string }) => {

    const res = await exploreApi.get(`?query=${query}`);

    return res.data.data
}

export const getUserSearchSuggestions = async ({ query }: { query: string }) => {

    const res = await exploreApi.get(`?query=${query}`);

    return res.data.data
}