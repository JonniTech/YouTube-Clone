import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Library } from "lucide-react";

export default function Subscriptions() {
    return (
        <div className="p-6">
            <SignedIn>
                <div className="flex flex-col gap-6">
                    <h1 className="text-2xl font-bold">Subscriptions</h1>
                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                        <Library className="h-24 w-24 text-muted-foreground opacity-20" />
                        <h2 className="text-xl font-medium">Don't miss a new video</h2>
                        <p className="text-muted-foreground max-w-sm">
                            When you subscribe to a channel, their new videos will show up here.
                        </p>
                    </div>
                </div>
            </SignedIn>
            <SignedOut>
                <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] gap-4 text-center">
                    <Library className="h-24 w-24 text-muted-foreground opacity-20" />
                    <h2 className="text-xl font-bold">Don't miss a new video</h2>
                    <p className="text-muted-foreground mb-4">
                        Sign in to see updates from your favorite YouTube channels
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
