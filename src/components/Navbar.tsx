import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { Button } from "@/components/ui/button";
import { Youtube, Menu, Bell, Video, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useSidebar } from "@/hooks/use-sidebar";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton
} from "@clerk/clerk-react";

export const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const { toggle } = useSidebar();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-[56px] items-center justify-between px-4 gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={toggle}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <Link to="/" className="flex items-center gap-1 pr-4">
                        <Youtube className="h-6 w-6 text-red-600" fill="currentColor" />
                        <span className="text-xl font-bold tracking-tighter">
                            TevTube
                        </span>
                    </Link>
                </div>

                <div className="flex-1 max-w-[720px] hidden md:flex items-center gap-4">
                    <SearchBar />
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="rounded-full"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex">
                        <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex">
                        <Bell className="h-5 w-5" />
                    </Button>

                    <div className="flex items-center">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button variant="outline" size="sm" className="rounded-full border-blue-500 text-blue-500 hover:bg-blue-500/10 hover:text-blue-500 transition-colors font-medium ml-2">
                                    Sign In
                                </Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: "h-8 w-8"
                                    }
                                }}
                            />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    );
};
