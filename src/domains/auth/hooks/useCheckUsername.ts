import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCheckUsername = (username: string) => {
    return useQuery({
        queryKey: ["check-username", username],

        queryFn: async () => {
            const response = await axios.get(
                `/api/auth/check-username-unique?username=${encodeURIComponent(username)}`
            );

            return response.data;
        },

        enabled: Boolean(username),

        staleTime: 30 * 1000,
    });
};