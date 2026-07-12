import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface SuggestionItemProps {
    href: string;
    title: string;
    icon: React.ReactNode;
    onClose?: () => void;
}

export function SuggestionItem({
    href,
    title,
    icon,
    onClose,
}: SuggestionItemProps) {
    return (
        <Link
            href={href}
            onClick={onClose}
            className="
                group
                flex
                items-center
                justify-between
                border-b
                px-4
                py-3
                transition-colors
                hover:bg-muted/60
                last:border-none
            "
        >
            <div className="flex items-center gap-3">

                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    {icon}
                </div>

                <p className="font-medium truncate">
                    {title}
                </p>

            </div>

            <ArrowUpRight
                className="
                    h-4
                    w-4
                    opacity-0
                    transition-all
                    duration-200
                    group-hover:translate-x-1
                    group-hover:opacity-100
                "
            />
        </Link>
    );
}