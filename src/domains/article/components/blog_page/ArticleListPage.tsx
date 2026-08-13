import { Button } from "@/components/ui/button";
import { ArticleListSectionProps } from "../../type";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import ArticleCard from "./_components/ArticleCard";

const ArticleListPage = ({
    title,
    description,
    articles,
    limit,
    viewAllHref,
    topRight
}: ArticleListSectionProps) => {
    const displayedArticles = limit
        ? articles?.slice(0, limit)
        : articles;

    return (
        <section className="mx-auto mt-12 w-full max-w-7xl p-8 lg:p-0 md:p-0">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        {title}
                    </h2>

                    {description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>

                {viewAllHref && (
                    <Button variant="ghost" asChild>
                        <Link href={viewAllHref}>
                            View all
                        </Link>
                    </Button>
                )}
            </div>

            {displayedArticles?.length === 0 ? (
                <Card className="flex h-56 items-center justify-center">
                    <p className="text-muted-foreground">
                        No articles yet.
                    </p>
                </Card>
            ) : (
                
                <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
                    {displayedArticles.map((article) => (
                        <ArticleCard
                            key={article._id}
                            article={article}
                            topRight={topRight}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ArticleListPage