import { VideoCard } from "./VideoCard";
import type { YouTubeVideo } from "@/types/youtube";

interface VideoGridProps {
    videos: YouTubeVideo[];
}

export const VideoGrid = ({ videos }: VideoGridProps) => {
    return (
        <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video, index) => (
                <VideoCard key={index} video={video} />
            ))}
        </div>
    );
};
