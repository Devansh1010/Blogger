'use client'

import { Badge } from '@/components/ui/badge'
import { Article } from '@/domains/article/type'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import ActionsArticle from './ActionsArticle'
import { formatDate } from '@/domains/explore/utils/dateFormate'


const ArticleCard = ({ blog }: { blog: Article }) => {

    const { data: session } = useSession()

    const formatedDate = formatDate(blog.createdAt)

    return (
        <div>
            <div className="relative w-full overflow-hidden rounded-[1.5rem] bg-muted aspect-16/10 border border-border/30 shadow-sm">
                <Image
                    src={blog?.coverImage || '/placeholder-blog.jpg'} // Fallback image
                    alt={blog?.title || "Blog cover"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* OVERLAY ACTIONS */}
                {
                    session?.user && (   //! wrong logic (all login user access)
                        <ActionsArticle
                            blog={blog}
                        />
                    )
                }
            </div>

            {/* TEXT CONTENT */}
            <div className="flex flex-col space-y-3 px-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Badge
                            className={`text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold border-none shadow-none ${blog.isPublished
                                ? "bg-emerald-500/10 text-emerald-600"
                                : "bg-orange-500/10 text-orange-600"
                                }`}
                        >
                            {blog.isPublished ? "Live" : "Draft"}
                        </Badge>

                        {/* Read Time indicator */}
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                            {blog.readTime} : min read
                        </span>
                    </div>

                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        {formatedDate}
                    </span>
                </div>

                <Link href={`/user/explore/${blog.slug}`}>
                    <h4 className="text-xl font-serif font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2 decoration-primary/30 underline-offset-4 group-hover:underline">
                        {blog.title}
                    </h4>
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {blog.desc}
                </p>
            </div>
        </div>
    )
}

export default ArticleCard