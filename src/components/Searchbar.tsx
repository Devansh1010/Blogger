import { Input } from "@/components/ui/input";
import { ExploreSearchProps } from "@/domains/explore/type";
import { Search } from "lucide-react";


export function Searchbar({
    value,
    setValue,
}: ExploreSearchProps) {

    return (
        <div className="relative w-full max-lg:">
            <Search
                className="
            absolute
            left-3
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            text-muted-foreground
            pointer-events-none
        "
            />

            <Input
                value={value}
                placeholder="Search Articles and Series..."
                onChange={(e) => setValue(e.target.value)}
                className="
            h-11
            pl-10
            pr-4
            rounded-xl
        "
            />
        </div>
    );
}