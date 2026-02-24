import { VideoGridSkeleton } from "@/components/LoadingSkeleton";

export default function Shorts() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <h1 className="text-2xl font-bold">Shorts</h1>
            <p className="text-muted-foreground">Short-form video feed coming soon!</p>
            <div className="w-full max-w-md mx-6">
                <VideoGridSkeleton />
            </div>
        </div>
    );
}
