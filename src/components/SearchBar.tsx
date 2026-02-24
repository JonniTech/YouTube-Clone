import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Mic } from "lucide-react";

export const SearchBar = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className="flex flex-1 items-center gap-4">
            <form onSubmit={handleSearch} className="flex flex-1 items-center">
                <div className="flex flex-1 items-center rounded-full border border-border bg-background shadow-inner">
                    <div className="flex flex-1 items-center px-4 py-1.5 overflow-hidden">
                        <Input
                            type="text"
                            placeholder="Search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full border-none bg-transparent p-0 text-base focus-visible:ring-0 placeholder:text-muted-foreground/60"
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="secondary"
                        className="h-[40px] px-5 rounded-r-full border-l border-border bg-secondary hover:bg-muted"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </form>
            <Button variant="secondary" size="icon" className="rounded-full bg-secondary hover:bg-muted">
                <Mic className="h-5 w-5" />
            </Button>
        </div>
    );
};
