export interface ExploreSearchProps {
    value: string;
    setValue: (value: string) => void;
}

export interface Suggestion {
    title: string;
    slug: string;
    // type: "article" | "series" | "author";
    description?: string;
}

export interface SearchSuggestionsProps {
    query: string;
    suggestions: Suggestion[];
    isPending: boolean;
    isError: boolean;
    onClose?: () => void;
}