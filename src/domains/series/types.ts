export interface Series {
    id?: string,
    author: { username: string, avatar: string },

    title: string,
    slug: string,
    desc?: string,

    blogs: string[]

    coverImage?: string
    tags?: string[]
    views?: number

    isPublished: boolean
    publishedAt?: Date | null

    createdAt: Date,
    updatedAt: Date,
}

export interface SeriesListSectionProps {
    title: string;
    description?: string;
    series: Series[];
    limit?: number;
    viewAllHref?: string;
}