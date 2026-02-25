import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { Button } from "@/components/ui/button";
import { Youtube, Menu, Bell, Video, Sun, Moon, Search } from "lucide-react";
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
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-[56px] items-center justify-between px-4 gap-4">
                {/* Left Section: Menu & Logo */}
                {!isMobileSearchOpen && (
                    <div className="flex items-center gap-1 sm:gap-4 shrink-0">
                        <Button variant="ghost" size="icon" className="rounded-full" onClick={toggle}>
                            <Menu className="h-5 w-5" />
                        </Button>
                        <Link to="/" className="flex items-center gap-1 pr-1 sm:pr-4">
                            <Youtube className="h-6 w-6 text-red-600" fill="currentColor" />
                            <span className="text-lg sm:text-xl font-bold tracking-tighter">
                                TevTube
                            </span>
                        </Link>
                    </div>
                )}

                {/* Middle Section: Desktop Search */}
                <div className="flex-1 max-w-[720px] hidden md:flex items-center gap-4">
                    <SearchBar />
                </div>

                {/* Mobile Search Overlay/Button */}
                {isMobileSearchOpen ? (
                    <div className="flex flex-1 items-center gap-2 animate-in slide-in-from-top-2 duration-200">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full shrink-0"
                            onClick={() => setIsMobileSearchOpen(false)}
                        >
                            <Menu className="h-5 w-5 rotate-90" /> {/* Back arrow equivalent for mobile */}
                        </Button>
                        <SearchBar />
                    </div>
                ) : (
                    <div className="md:hidden flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => setIsMobileSearchOpen(true)}
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                )}

                {/* Right Section: Actions & User */}
                {!isMobileSearchOpen && (
                    <div className="flex items-center gap-0.5 sm:gap-2 shrink-0">
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
                                    <Button variant="outline" size="sm" className="rounded-full border-blue-500 text-blue-500 hover:bg-blue-500/10 hover:text-blue-500 transition-colors font-medium ml-1 sm:ml-2">
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
                )}
            </div>
        </nav>
    );
};
