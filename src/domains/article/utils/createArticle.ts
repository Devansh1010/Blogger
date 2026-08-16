import { TiptapContent, TiptapNode } from "@/types/blog";
import { JSONContent } from "@tiptap/react";

function extractTextFromTiptap(node: TiptapNode): string {

    const words = node?.content?.reduce((acc, node) => (acc += node.text || ''), '')

    return words || ''

}

function calculateReadTime(content: TiptapContent) {
    const fullText = content?.content
        ?.map((node) => extractTextFromTiptap(node))
        .join(" ");

    const words = fullText
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .length;

    const wordsPerMinute = 130;

    return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function calculateExcerpt(content: TiptapContent) {

    const firstTextBlock = content?.content?.find(
        (block: JSONContent) =>
            (block.type === "paragraph" || block.type === "heading") &&
            block.content
    );

    const rawText =
        firstTextBlock?.content
            ?.map((node: JSONContent) => node.text || "")
            .join("") || "";


    return rawText.replace(/<[^>]*>/g, "").slice(0, 150);
}

export function readTimeAndExcerpt(content: TiptapContent | undefined) {

    if (!content || !Array.isArray(content.content)) {
        return {
            readTime: 0,
            excerpt: ''
        }
    }

    const readTime = calculateReadTime(content);

    const excerpt = calculateExcerpt(content);

    return {
        readTime,
        excerpt
    }
}