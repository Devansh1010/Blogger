export interface ExploreSearchProps {
    value: string;
    setValue: (value: string) => void;
}

export type Suggestion =
    | ArticleSuggestion
    | SeriesSuggestion
    | UserSuggestion;

export interface ArticleSuggestion {
    type: "article";
    title: string;
    slug: string;
    description?: string;
}

export interface SeriesSuggestion {
    type: "series";
    title: string;
    slug: string;
    description?: string;
}

export interface UserSuggestion {
    type: "user";
    username: string;
}

export interface SuggestionsResponse {
    articles: ArticleSuggestion[];
    series: SeriesSuggestion[];
    users: UserSuggestion[];
}
export interface SearchSuggestionsProps {
    query: string;
    suggestions: SuggestionsResponse;
    isPending: boolean;
    isError: boolean;
    onClose?: () => void;
}