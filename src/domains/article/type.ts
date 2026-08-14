import { JSONContent } from "@tiptap/react";

export interface CreateBlogVariables {
    blogId?: string
    title?: string;
    hook?: string
    content?: JSONContent;
    level?: string,
    insights?: string[],
    isPublished?: boolean;
    seriesId?: string;
    coverImage?: string;
    tags?: string[];
    seriesPartOf: string
}

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