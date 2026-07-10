import axios from "axios";

const exploreApi = axios.create({
    baseURL: '/api/explore',
    withCredentials: true
})

export const getSearchSuggestions = async ({ query }: { query: string }) => {

    const res = await exploreApi.get(`?query=${query}`);

    return res.data.data
}