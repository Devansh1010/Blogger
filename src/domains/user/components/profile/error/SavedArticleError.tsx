import { AlertCircle, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

const SavedArticleError = () => {
    return (
        <div className="flex min-h-75 flex-col items-center justify-center rounded-xl border bg-muted/20 px-6 text-center mt-14">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="size-5 text-destructive" />
            </div>

            <h3 className="text-lg font-semibold">
                Unable to load saved articles
            </h3>

            <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Something went wrong while fetching your saved articles.
                Please try again.
            </p>

            <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => window.location.reload()}
            >
                <RefreshCcw className="mr-2 size-4" />
                Try again
            </Button>
        </div>
    );
};

export default SavedArticleError;