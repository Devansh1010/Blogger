import { useMutation } from "@tanstack/react-query"
import { updateSelectedBadges } from "../../axios/user.axios"


export const useUpdateSelectedBadges = () => {
    return useMutation({
        mutationFn: updateSelectedBadges,
    })
}