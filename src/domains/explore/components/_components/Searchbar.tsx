import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ExploreSearchProps } from "../../type";
import { useDebounceSearch } from "../../hooks/useDebounceSearch";
import { useSearchSuggestions } from "../../hooks/useSearchSuggestions";
import { SearchSuggestions } from "./SearchSuggestions";


export function Searchbar({
    value,
    setValue,
}: ExploreSearchProps) {

    const { debouncedValue } = useDebounceSearch({ value })

    const {
        suggestions,
        isPending,
        isError
    } = useSearchSuggestions({ query: debouncedValue })

    const shouldShowSuggestions = value.trim().length >= 2

    return (
        <div className="relative w-full max-lg:">
            <Search
                className="
            absolute
            left-3
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            text-muted-foreground
            pointer-events-none
        "
            />

            <Input
                value={value}
                placeholder="Search..."
                onChange={(e) => setValue(e.target.value)}
                className="
            h-11
            pl-10
            pr-4
            rounded-xl
        "
            />

            {
                shouldShowSuggestions &&
                <SearchSuggestions
                    query={debouncedValue}
                    suggestions={suggestions}
                    isPending={isPending}
                    isError={isError}
                />
            }
        </div>
    );
}