import { Home as HomeIcon, Compass, ChevronRight, UserCircle, History, PlayCircle, Clock, ThumbsUp, Library } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { icon: HomeIcon, label: "Home", path: "/" },
    { icon: Compass, label: "Shorts", path: "/shorts" },
    { icon: Library, label: "Subscriptions", path: "/subscriptions" },
];

const mainItems = [
    { icon: UserCircle, label: "You", path: "/you" },
    { icon: History, label: "History", path: "/history" },
    { icon: PlayCircle, label: "Your videos", path: "/your-videos" },
    { icon: Clock, label: "Watch later", path: "/watch-later" },
    { icon: ThumbsUp, label: "Liked videos", path: "/liked-videos" },
];

const subscriptionItems = [
    { label: "Vercel", avatar: "V" },
    { label: "Tailwind Labs", avatar: "T" },
    { label: "shadcn", avatar: "S" },
    { label: "React", avatar: "R" },
];

export const Sidebar = () => {
    const { isOpen } = useSidebar();
    const location = useLocation();

    return (
        <aside className={cn(
            "hidden lg:flex flex-col shrink-0 sticky top-[56px] h-[calc(100vh-56px)] overflow-hidden transition-all duration-300 bg-background border-r border-border",
            isOpen ? "w-[240px] px-3" : "w-[72px] px-1"
        )}>
            <div className="flex flex-col gap-1 py-2">
                {sidebarItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link key={item.label} to={item.path}>
                            <Button
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start rounded-[10px] transition-all duration-300",
                                    isOpen ? "gap-6 px-3 py-5" : "gap-0 px-0 py-6 justify-center"
                                )}
                                title={!isOpen ? item.label : undefined}
                            >
                                <item.icon className={cn("h-6 w-6 shrink-0", isActive ? "fill-current" : "")} />
                                {isOpen && <span className="text-[14px] truncate">{item.label}</span>}
                            </Button>
                        </Link>
                    );
                })}
            </div>
            {isOpen && <Separator className="my-2 mx-1" />}
            <div className="flex flex-col gap-1 py-2">
                {isOpen && (
                    <Link to="/you" className="px-3 py-2 flex items-center gap-2 font-bold cursor-pointer hover:bg-accent rounded-lg transition-colors">
                        <span>You</span>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                )}
                {mainItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link key={item.label} to={item.path}>
                            <Button
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start rounded-[10px] transition-all duration-300",
                                    isOpen ? "gap-6 px-3 py-5" : "gap-0 px-0 py-6 justify-center"
                                )}
                                title={!isOpen ? item.label : undefined}
                            >
                                <item.icon className={cn("h-6 w-6 shrink-0", isActive ? "fill-current" : "")} />
                                {isOpen && <span className="text-[14px] truncate">{item.label}</span>}
                            </Button>
                        </Link>
                    );
                })}
            </div>
            {isOpen && (
                <>
                    <Separator className="my-2 mx-1" />
                    <div className="flex flex-col gap-1 py-2">
                        <h3 className="px-3 py-2 font-bold text-sm">Subscriptions</h3>
                        {subscriptionItems.map((item) => (
                            <Button
                                key={item.label}
                                variant="ghost"
                                className="w-full justify-start gap-6 px-3 py-5 rounded-[10px] font-normal"
                            >
                                <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold shrink-0">
                                    {item.avatar}
                                </div>
                                <span className="text-sm truncate">{item.label}</span>
                            </Button>
                        ))}
                    </div>
                </>
            )}
        </aside>
    );
};
