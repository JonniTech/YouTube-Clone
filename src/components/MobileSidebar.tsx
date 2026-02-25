import { ChevronRight, Youtube, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { sidebarItems, mainItems, subscriptionItems } from "@/constants/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { SignOutButton, SignedIn } from "@clerk/clerk-react";
import { LogOut } from "lucide-react";

export const MobileSidebar = () => {
    const { isOpen, toggle, setOpen } = useSidebar();
    const location = useLocation();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
                    />

                    {/* Drawer */}
                    <motion.aside
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 left-0 z-[70] w-[240px] bg-background flex flex-col lg:hidden border-r border-border shadow-xl h-full"
                    >
                        {/* Header */}
                        <div className="flex h-[56px] items-center px-4 gap-4 sticky top-0 bg-background z-10">
                            <Button variant="ghost" size="icon" className="rounded-full" onClick={toggle}>
                                <Menu className="h-5 w-5" />
                            </Button>
                            <Link to="/" className="flex items-center gap-1" onClick={() => setOpen(false)}>
                                <Youtube className="h-6 w-6 text-red-600" fill="currentColor" />
                                <span className="text-xl font-bold tracking-tighter">
                                    TevTube
                                </span>
                            </Link>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar">
                            <div className="flex flex-col gap-1 pb-4">
                                {sidebarItems.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link key={item.label} to={item.path} onClick={() => setOpen(false)}>
                                            <Button
                                                variant={isActive ? "secondary" : "ghost"}
                                                className={cn(
                                                    "w-full justify-start rounded-[10px] gap-6 px-3 py-5"
                                                )}
                                            >
                                                <item.icon className={cn("h-6 w-6 shrink-0", isActive ? "fill-current" : "")} />
                                                <span className="text-[14px] truncate">{item.label}</span>
                                            </Button>
                                        </Link>
                                    );
                                })}
                            </div>

                            <Separator className="my-2 mx-1" />

                            <div className="flex flex-col gap-1 py-2">
                                <Link to="/you" className="px-3 py-2 flex items-center gap-2 font-bold cursor-pointer hover:bg-accent rounded-lg transition-colors" onClick={() => setOpen(false)}>
                                    <span>You</span>
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                                {mainItems.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link key={item.label} to={item.path} onClick={() => setOpen(false)}>
                                            <Button
                                                variant={isActive ? "secondary" : "ghost"}
                                                className={cn(
                                                    "w-full justify-start rounded-[10px] gap-6 px-3 py-5"
                                                )}
                                            >
                                                <item.icon className={cn("h-6 w-6 shrink-0", isActive ? "fill-current" : "")} />
                                                <span className="text-[14px] truncate">{item.label}</span>
                                            </Button>
                                        </Link>
                                    );
                                })}
                            </div>

                            <Separator className="my-2 mx-1" />

                            <div className="flex flex-col gap-1 py-2 pb-8">
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

                        </div>

                        <SignedIn>
                            <div className="px-4 py-6 border-t border-border mt-auto">
                                <SignOutButton>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start gap-6 px-4 py-6 rounded-[12px] group transition-all duration-300",
                                            "hover:bg-red-500/10 text-muted-foreground hover:text-red-500"
                                        )}
                                    >
                                        <LogOut className="h-6 w-6 shrink-0 group-hover:text-red-500 transition-colors" />
                                        <span className="text-[15px] font-semibold">Logout</span>
                                    </Button>
                                </SignOutButton>
                            </div>
                        </SignedIn>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};
