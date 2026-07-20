
import { ExploreSearchProps } from "../../type";
import { useDebounceSearch } from "../../hooks/useDebounceSearch";
import { SearchSuggestions } from "./SearchSuggestions";
import { Searchbar } from "@/components/Searchbar";
import { useSearchSuggestions } from "../../hooks/useSearchSuggestions";


export function ExploreSearchbar({
    value,
    setValue,
}: ExploreSearchProps) {

    const { debouncedValue } = useDebounceSearch({ value })

    const {
        suggestions,
        isPending,
        isError,
    } = useSearchSuggestions({ query: debouncedValue })


    const shouldShowSuggestions = value.trim().length >= 2

    const hasSuggestions =
        suggestions?.articles?.length > 0 ||
        suggestions?.series?.length > 0 ||
        suggestions?.users?.length > 0;

    return (
        <div className="relative w-full max-lg:">
            <Searchbar
                value={value}
                setValue={setValue}
            />
            {
                shouldShowSuggestions &&
                <SearchSuggestions
                    query={debouncedValue}
                    suggestions={suggestions}
                    isPending={isPending}
                    isError={isError}
                    hasSuggestions={hasSuggestions}
                />
            }
        </div>
    );
}