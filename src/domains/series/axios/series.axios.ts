import axios from "axios";

const seriesApi = axios.create({
    baseURL: "/api/series",
    withCredentials: true
})

export const getSeries = async () => {

    const res = await seriesApi.get(``);

    return res.data.data;
}

export const deleteSeries = async (slug: string) => {
    const res = await seriesApi.delete(`/${slug}`)
    return res.data;
}