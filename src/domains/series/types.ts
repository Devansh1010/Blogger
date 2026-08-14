export interface Series {
    _id: string,
    author: { username: string, avatar: string },

    title: string,
    slug: string,
    desc?: string,

    blogs: string[]

    coverImage?: string
    tags?: string[]
    views?: number

    isPublished: boolean
    publishedAt?: Date

    createdAt: Date,
    updatedAt: Date,
}

export interface SeriesListSectionProps {
    title: string;
    description?: string;
    series: Series[];
    limit?: number;
    viewAllHref?: string;
    className?: string;
}

export interface SeriesCardProps {
    series: Series;
    topRight?: React.ReactNode;
}