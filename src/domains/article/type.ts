import { JSONContent } from "@tiptap/react";
import { UseFormReturn } from "react-hook-form";

export type GetArticleParams = {
    page: number;
    tag?: string | null;
    q?: string | null;
    limit: number
}

export interface Article {
    _id: string;
    slug: string;
    tags?: string[];
    coverImage?: string;
    content: JSONContent;
    author: {
        _id: string;
        avatar?: string,
        username: string;
    };
    nextBlog: {
        _id: string,
        title: string,
        coverImage: string,
        desc: string,
        slug: string
    }
    title: string;
    hook: string;
    excerpt: string;
    insights: string[];
    desc: string;
    username: string;
    views: number;
    likes: number;
    readTime: number;
    level: "Beginner" | "Intermediate" | "Advanced";
    publishedAt?: Date;
    isPublished?: boolean;
    isFeatured?: boolean;
    createdAt?: Date;
}
export interface ArticleResponse {
    blogs: Article[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface ArticleListSectionProps {
    title: string;
    description?: string;
    articles: Article[];
    limit?: number;
    viewAllHref?: string;
    loading?: boolean;
    topRight?: React.ReactNode;
    className?: string
}

export interface ArticleFormValidation {
    blogId?: string;
    title: string;
    hook?: string;
    content?: JSONContent;
    level: "Beginner" | "Intermediate" | "Advanced";
    insights?: string[];
    isPublished: boolean;
    seriesId?: string;
    coverImage?: string;
    tags: string[];
    seriesPartOf?: string;
}

export interface ResetFormSchema {
    existingArticle: ArticleFormValidation,
    methods: UseFormReturn<ArticleFormValidation, unknown, ArticleFormValidation>
}

export interface EditorHeaderPrpos { 
    isPending: boolean, 
    isEditMode: boolean,
    onPublish: () => void,
    onSaveDraft: () => void,
}