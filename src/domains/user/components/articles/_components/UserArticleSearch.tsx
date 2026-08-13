
import { Searchbar } from '@/components/Searchbar'
import { SearchSuggestions } from '@/domains/explore/components/_components/SearchSuggestions'
import { ExploreSearchProps } from '@/domains/explore/type'
import { useUserSearchSuggestions } from '@/domains/user/hooks/useUserSearchSuggestions'
import { useDebounce } from '@/helpers/useDebounce'

const UserArticleSearch = ({
    value,
    setValue,
}: ExploreSearchProps) => {

    const shouldShowSuggestions = value.trim().length >= 2;

    const { debouncedValue } = useDebounce(value, 300);

    const {
        suggestions,
        isPending,
        isError,
    } = useUserSearchSuggestions({ search: debouncedValue });

    return (
        <div className='w-full'>
            <Searchbar
                value={value}
                setValue={setValue}
            />

            {
                shouldShowSuggestions &&
                (<SearchSuggestions
                    hasSuggestions={shouldShowSuggestions}
                    suggestions={suggestions?.data}
                    isError={isError}
                    isPending={isPending}
                    query={value}
                />)
            }
        </div>
    )
}

export default UserArticleSearch