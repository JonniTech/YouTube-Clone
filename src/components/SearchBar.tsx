import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Mic } from "lucide-react";

export const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className="flex flex-1 items-center gap-4 max-w-[720px] mx-auto">
            <form onSubmit={handleSearch} className="flex flex-1 items-center group">
                <div className={`flex flex-1 items-center rounded-l-full border transition-all duration-200 bg-background/95 ${isFocused
                        ? "border-blue-500 ring-1 ring-blue-500/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
                        : "border-border shadow-inner"
                    }`}>
                    <div className="flex items-center flex-1 px-4 py-1.5 overflow-hidden ml-1">
                        {isFocused && (
                            <Search className="h-4 w-4 mr-3 text-muted-foreground shrink-0 animate-in fade-in duration-200" />
                        )}
                        <Input
                            type="text"
                            placeholder="Search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="w-full border-none bg-transparent p-0 text-[16px] focus-visible:ring-0 placeholder:text-muted-foreground/70"
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    variant="secondary"
                    className="h-[40px] px-5 rounded-r-full border border-l-0 border-border bg-secondary/80 hover:bg-muted/90 flex-shrink-0"
                >
                    <Search className="h-5 w-5" />
                </Button>
            </form>
            <Button variant="secondary" size="icon" className="rounded-full bg-secondary/80 hover:bg-muted/90 flex-shrink-0">
                <Mic className="h-5 w-5" />
            </Button>
        </div>
    );
};
