
import {
    Search,
    FileText,
    BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ArticleSuggestion, SearchSuggestionsProps, SeriesSuggestion } from "../../type";
import { SuggestionItem } from "./SuggestionItemProps";


export function SearchSuggestions({
    query,
    suggestions,
    isPending,
    isError,
    hasSuggestions,
    onClose,
}: SearchSuggestionsProps) {

    if (!query.trim()) return null;

    return (
        <div
            className={cn(
                "absolute left-0 top-full z-50 mt-2",
                "w-full",
                "overflow-hidden rounded-2xl",
                "border border-border/70",
                "bg-background/95 backdrop-blur-xl",
                "shadow-xl",
                "animate-in fade-in-0 zoom-in-95 duration-200"
            )}
        >
            <div className="border-b bg-muted/30 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Suggestions
                </p>
            </div>

            <div className="max-h-96 overflow-y-auto">

                {isPending && (
                    <div className="space-y-3 p-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-14 animate-pulse rounded-lg bg-muted"
                            />
                        ))}
                    </div>
                )}

                {isError && (
                    <div className="py-8 text-center text-sm text-destructive">
                        Something went wrong.
                    </div>
                )}

                {!isPending &&
                    !isError &&
                    !hasSuggestions && (
                        <div className="py-10 text-center">
                            <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

                            <p className="font-medium">
                                No results found
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Try another keyword.
                            </p>
                        </div>
                    )}

                <div className="max-h-96 overflow-y-auto">

                    {/* Articles */}
                    {suggestions?.articles?.length > 0 && (
                        <>
                            <p className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                Articles
                            </p>

                            {suggestions.articles.map((item: ArticleSuggestion) => (
                                <SuggestionItem
                                    key={item.slug}
                                    href={`/user/explore/${item.slug}`}
                                    icon={<FileText className="h-4 w-4" />}
                                    title={item.title}
                                    onClose={onClose}
                                />
                            ))}
                        </>
                    )}

                    {/* Series */}
                    {suggestions?.series?.length > 0 && (
                        <>
                            <p className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                Series
                            </p>

                            {suggestions.series.map((item: SeriesSuggestion) => (
                                <SuggestionItem
                                    key={item.slug}
                                    href={`/user/series/${item.slug}`}
                                    icon={<BookOpen className="h-4 w-4" />}
                                    title={item.title}
                                    onClose={onClose}
                                />
                            ))}
                        </>
                    )}

                    {/* Users */}
                    {suggestions?.users?.length > 0 && (
                        <>
                            <p className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                People
                            </p>

                            {/* {suggestions.users.map((item: UserSuggestion) => (
                                <SuggestionItem
                                    key={item.username}
                                    href={`/user/${item.username}`}
                                    icon={<User className="h-4 w-4" />}
                                    title={`@${item.username}`}
                                    onClose={onClose}
                                />
                            ))} */}
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}