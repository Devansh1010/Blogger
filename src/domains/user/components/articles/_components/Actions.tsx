'use client';

import Link from "next/link";
import {
    MoreVertical,
    Pencil,
    Star,
    EyeOff,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionsProps } from "@/domains/user/type";

const Actions = ({
    id,
    slug,
    isFeatured,
    isArticle,
    isPublished,
    onDelete,
    onFeature,
    onUnpublish,
}: ActionsProps) => {
  
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="h-9 w-9 rounded-full backdrop-blur-md"
                >
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56"
            >
                <DropdownMenuItem asChild>
                    {isArticle ?
                        <Link href={`/write-blog/${slug}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Article
                        </Link> :
                        <></>
                    }
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation();
                        onFeature?.(id);
                    }}
                >
                    <Star className="mr-2 h-4 w-4" />
                    {isFeatured
                        ? "Remove Featured"
                        : "Set as Featured"}
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => onUnpublish?.(id)}
                >
                    <EyeOff className="mr-2 h-4 w-4" />
                    {isPublished
                        ? "Unpublish"
                        : "Publish"}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.(id);
                    }}
                    className="text-destructive focus:text-destructive"
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Article
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Actions;