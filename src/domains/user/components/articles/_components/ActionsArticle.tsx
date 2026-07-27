'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Article } from '@/domains/article/type'
import { useDeleteArticle } from '@/domains/user/hooks/useDeleteArticle'
import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'


const ActionsArticle = ({ blog }: { blog: Article }) => {
    const mutation = useDeleteArticle()

    return (
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2.5 group-hover:translate-y-0">
            <Link href={`/write-blog/${blog.slug}`}>
                <Button variant="secondary" size="icon" className="h-9 w-9 rounded-full  backdrop-blur shadow-md ">
                    <Pencil className="w-4 h-4" />
                </Button>
            </Link>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="h-9 w-9 rounded-full bg-white/95 backdrop-blur shadow-md text-destructive hover:bg-destructive hover:text-white"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-[2rem]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-serif text-2xl">Remove Story</AlertDialogTitle>
                        <AlertDialogDescription className="text-base">
                            This action is permanent. This will delete <span className="font-semibold text-foreground italic">&quot;{blog.title}&quot;</span> from your dashboard.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => mutation.mutate(blog.slug)}
                            className="rounded-full bg-destructive hover:bg-destructive/90"
                        >
                            Delete Permanently
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default ActionsArticle