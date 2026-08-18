import { Button } from "@/components/ui/button";
import { ArticleListSectionProps } from "../../type";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import ArticleCard from "./_components/ArticleCard";
import { cn } from "@/lib/utils";

const ArticleListPage = ({
    title,
    description,
    articles,
    limit,
    viewAllHref,
    topRight,
    renderTopRight,
    className
}: ArticleListSectionProps) => {
    const displayedArticles = limit
        ? articles?.slice(0, limit)
        : articles;

    return (
        <section
            className={cn(
                "mx-auto mt-12 w-full max-w-7xl rounded-[28px] border border-border/60 bg-card/70 p-5 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-6",
                className
            )}
        >
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-border/60 pb-4">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        {title}
                    </h2>

                    {description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>

                {viewAllHref && (
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="shrink-0 text-muted-foreground hover:text-foreground"
                    >
                        <Link href={viewAllHref}>
                            View all
                        </Link>
                    </Button>
                )}
            </div>

            {/* Content */}
            {displayedArticles?.length === 0 ? (
                <Card className="flex min-h-48 items-center justify-center border-dashed">
                    <div className="text-center">
                        <p className="text-sm font-medium">
                            No articles yet
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Articles published by this author will appear here.
                        </p>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {displayedArticles.map((article) => (
                        <ArticleCard
                            key={article._id}
                            article={article}
                            topRight={renderTopRight ? renderTopRight(article) : topRight}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ArticleListPage