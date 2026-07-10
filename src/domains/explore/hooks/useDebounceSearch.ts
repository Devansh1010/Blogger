
import { useDebounce } from "@/helpers/useDebounce"


export function useDebounceSearch({ value }: { value: string }) {
    const query = useDebounce(value, 500)

    return query
}