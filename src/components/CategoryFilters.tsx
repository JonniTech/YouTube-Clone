import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const categories = [
    "All",
    "Music",
    "Gaming",
    "Live",
    "Coding",
    "React",
    "Tailwind",
    "Web Development",
    "TypeScript",
    "Modern Art",
    "Animation",
    "Cookery",
    "News",
    "Sports",
    "Learning",
    "Fashion",
    "Podcasts",
];

interface CategoryFiltersProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export const CategoryFilters = ({ selectedCategory, onCategoryChange }: CategoryFiltersProps) => {
    return (
        <div className="sticky top-0 z-40 bg-background py-3 max-w-full overflow-hidden px-1">
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-3 px-6">
                    {categories.map((category) => (
                        <Badge
                            key={category}
                            variant={category === selectedCategory ? "default" : "secondary"}
                            onClick={() => onCategoryChange(category)}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-sm font-normal cursor-pointer transition-colors border",
                                category === selectedCategory
                                    ? "bg-foreground text-background hover:bg-foreground/90 border-transparent"
                                    : "bg-secondary/80 dark:bg-secondary/40 text-foreground hover:bg-secondary border-border/50"
                            )}
                        >
                            {category}
                        </Badge>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
        </div>
    );
};
