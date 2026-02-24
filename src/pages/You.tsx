import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { UserCircle, History, PlayCircle, Clock, ThumbsUp } from "lucide-react";

export default function You() {
    const { user } = useUser();

    return (
        <div className="p-6">
            <SignedIn>
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                        <div className="h-20 w-20 rounded-full overflow-hidden">
                            <img src={user?.imageUrl} alt={user?.fullName || "User"} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-bold">{user?.fullName}</h1>
                            <p className="text-muted-foreground">@{user?.username || user?.firstName?.toLowerCase()}</p>
                            <Link to="/profile" className="text-blue-500 text-sm font-medium mt-1">View Channel</Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 border rounded-xl hover:bg-accent cursor-pointer transition-colors flex items-center gap-3">
                            <History className="h-6 w-6" />
                            <span className="font-medium">History</span>
                        </div>
                        <div className="p-4 border rounded-xl hover:bg-accent cursor-pointer transition-colors flex items-center gap-3">
                            <PlayCircle className="h-6 w-6" />
                            <span className="font-medium">Your Videos</span>
                        </div>
                        <div className="p-4 border rounded-xl hover:bg-accent cursor-pointer transition-colors flex items-center gap-3">
                            <Clock className="h-6 w-6" />
                            <span className="font-medium">Watch Later</span>
                        </div>
                        <div className="p-4 border rounded-xl hover:bg-accent cursor-pointer transition-colors flex items-center gap-3">
                            <ThumbsUp className="h-6 w-6" />
                            <span className="font-medium">Liked Videos</span>
                        </div>
                    </div>
                </div>
            </SignedIn>
            <SignedOut>
                <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] gap-4 text-center">
                    <UserCircle className="h-24 w-24 text-muted-foreground opacity-20" />
                    <h2 className="text-xl font-bold">Enjoy your favorite videos</h2>
                    <p className="text-muted-foreground mb-4">
                        Sign in to access videos that you’ve liked or saved
                    </p>
                    <SignInButton mode="modal">
                        <Button variant="outline" className="rounded-full border-blue-500 text-blue-500 hover:bg-blue-500/10">
                            Sign in
                        </Button>
                    </SignInButton>
                </div>
            </SignedOut>
        </div>
    );
}

// Helper to use Link since it's not imported
import { Link } from "react-router-dom";
