import { useQuery } from "@tanstack/react-query";
import { getSeries } from "../axios/series.axios";

export function useSeries() {
    const {data, isPending, isError} =  useQuery({
        queryKey: ["series"],
        queryFn: () =>
            getSeries(),
    });

    return {
        series: data,
        isSeriesPendding: isPending,
        isSeriesError: isError
    }
}