'use client'

import { Settings2 } from "lucide-react";
import { FormProvider } from "react-hook-form";

import { WriteBlogError } from "@/components/features/blogs/error/WriteBlogError";
import { WriteBlogLoader } from "@/components/features/blogs/loader/WriteBlogLoader";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useGetUserSeries } from "@/domains/series/hooks/useGetUserSeries";
import { useArticle } from "../../hooks/useArticle";
import { useTags } from "../../hooks/useTags";
import { useFormSchema } from "../../hooks/useFormSchema";
import { useResetFormSchema } from "../../hooks/useResetFormSchema";
import { useCreateArticle, useUpdateArticle } from "../../hooks/useMutationFrom";
import { ArticleFormValidation } from "../../type";
import { useBeforeUnloding } from "../../hooks/useBeforeUnloding";
// nested Components
import { EditorHeader } from "./_components/EditorHeader";
import { CoverImageSection } from "./_components/CoverImageSection";
import { SeriesSelector } from "./_components/SelectSeries";
import { TagSelector } from "./_components/TagSelector";
import { HookField } from "./_components/HookField";
import { LevelSelector } from "./_components/LevelSelector";
import { InsightsField } from "./_components/InsightsField";
import { TitleField } from "./_components/TitleField";
import { EditorField } from "./_components/EditorContent";



export default function ArticleForm({ slug }: { slug?: string }) {

    // Series data for dropdown
    const { userSeries, isPending, isError } = useGetUserSeries({ page: 1 })

    // Fetch existing article data if in edit mode
    const { article, isArticleFetching } = useArticle(slug)

    // Fetching Tags
    const { Tags, isTagPendding } = useTags()

    //Form Defination
    const methods = useFormSchema()

    //destructure methods
    const { handleSubmit, formState: { isDirty }, setValue } = methods;

    //prevent users from leaving without saving.
    useBeforeUnloding(isDirty)

    useResetFormSchema({ existingArticle: article, methods })

    // Create Article
    const mutation = useCreateArticle()

    // New Update Mutation
    const updateMutation = useUpdateArticle(slug)

    const onSubmit = (formData: ArticleFormValidation) => {
        if (slug) {
            updateMutation.mutate({
                ...formData,
                slug,
            });
        } else {
            mutation.mutate(formData);
        }
    };

    const handleSaveDraft = () => {
        setValue("isPublished", false);
        void handleSubmit(onSubmit)();
    };

    const handlePublish = () => {
        setValue("isPublished", true);
        void handleSubmit(onSubmit)();
    };

    if (isPending || (slug && isArticleFetching) || isTagPendding) return <WriteBlogLoader />

    if (isError) return <WriteBlogError />

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-background selection:bg-primary/20">

                <EditorHeader
                    isPending={isPending}
                    isEditMode={!!slug}
                    onSaveDraft={handleSaveDraft}
                    onPublish={handlePublish}
                />

                <main className="max-w-4xl mx-auto px-6 pt-6 pb-32">
                    {/* 1. Cover Image - Reduced margin to pull content up */}
                    <div className="mb-6">

                        <CoverImageSection />

                    </div>

                    {/* 2. Unified Meta & Configuration Row */}
                    <div className="space-y-4 mb-8">
                        {/* Core Metadata: Series & Tags */}
                        <div className="flex items-center gap-3 pb-4 border-b border-border/40">

                            <SeriesSelector availableSeries={userSeries} />
                            <div className="h-4 w-px bg-border/60" />

                            <TagSelector availableTags={Tags} />

                        </div>

                        {/* Technical Configuration: Using shadcn Accordion */}
                        <Accordion type="single" collapsible className="border-none">
                            <AccordionItem value="technical-details" className="border-none">
                                <AccordionTrigger className="py-2 hover:no-underline group">
                                    <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <Settings2 className="w-3.5 h-3.5 text-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                            Configure Technical Metadata
                                        </span>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent className="pt-4 pb-6 px-1">
                                    {/* Using a grid to save even more vertical space */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-muted/20 p-6 rounded-2xl border border-muted/50">
                                        <div className="space-y-6">

                                            <HookField />

                                            <LevelSelector />

                                        </div>
                                        <div>

                                            <InsightsField />

                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* 3. The Main Writing Canvas */}
                    <article className="space-y-4">

                        <TitleField />

                        <div className="relative">

                            <EditorField existingArticleId={article?._id} />

                        </div>
                    </article>
                </main>
            </form>
        </FormProvider>
    )
}