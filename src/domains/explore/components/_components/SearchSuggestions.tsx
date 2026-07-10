import Link from "next/link";
import {
    Search,
    // FileText,
    // BookOpen,
    // User,
    ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchSuggestionsProps, Suggestion } from "../../type";


export function SearchSuggestions({
    query,
    suggestions,
    isPending,
    isError,
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
                    suggestions.length === 0 && (
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

                {suggestions?.map((item: Suggestion) => (
                    <Link
                        key={item.slug}
                        href={`/user/explore/${item.slug}`}
                        onClick={onClose}
                        className="
                            group
                            flex
                            items-center
                            justify-between
                            gap-4
                            border-b
                            px-4
                            py-3
                            transition-colors
                            last:border-none
                            hover:bg-muted/60
                        "
                    >
                        <div className="flex items-center gap-3">

                            {/* <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                {item.type === "article" && (
                                    <FileText className="h-4 w-4" />
                                )}

                                {item.type === "series" && (
                                    <BookOpen className="h-4 w-4" />
                                )}

                                {item.type === "author" && (
                                    <User className="h-4 w-4" />
                                )}
                            </div> */}

                            <div className="min-w-0">
                                <p className="truncate font-medium">
                                    {item.title}
                                </p>

                                <p className="truncate text-sm text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        <ArrowUpRight
                            className="
                                h-4
                                w-4
                                opacity-0
                                transition-all
                                group-hover:translate-x-1
                                group-hover:opacity-100
                            "
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}