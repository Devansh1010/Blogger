import { Button } from '@/components/ui/button'
import { FileEdit } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NoArticle = () => {
    return (
        <div className="py-32 flex flex-col items-center justify-center text-center rounded-[2.5rem] border-2 border-dashed border-border/40 bg-muted/5">
            <div className="bg-background shadow-xl shadow-black/2 rounded-full p-6 mb-6 border border-border/40">
                <FileEdit className="w-12 h-12 text-primary/30" />
            </div>
            <h4 className="text-2xl font-serif font-bold">Your story begins here</h4>
            <p className="max-w-xs text-sm text-muted-foreground mt-3 leading-relaxed">
                Ready to share your engineering deep-dives? Start crafting your first masterpiece.
            </p>
            <Link href="/write-blog" className="mt-8">
                <Button variant="outline" className="rounded-full px-10 hover:bg-primary hover:text-white transition-colors">
                    Create First Post
                </Button>
            </Link>
        </div>
    )
}

export default NoArticle