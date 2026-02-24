import { Link } from "react-router-dom";
import type { YouTubeVideo } from "@/types/youtube";
import { formatViews, formatRelativeTime } from "@/lib/formatters";

interface RelatedVideosProps {
    videos: YouTubeVideo[];
}

export const RelatedVideos = ({ videos }: RelatedVideosProps) => {
    return (
        <div className="flex flex-col gap-4">
            {videos.map((video) => {
                const videoId = typeof video.id === 'string' ? video.id : video.id.videoId;
                return (
                    <Link key={videoId} to={`/watch/${videoId}`} className="flex gap-2 group transition-all duration-200">
                        <div className="relative aspect-video w-[168px] shrink-0 overflow-hidden rounded-lg bg-accent">
                            <img
                                src={video.snippet.thumbnails.medium.url}
                                alt={video.snippet.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded font-medium">
                                {video.contentDetails?.duration?.replace('PT', '').replace('M', ':').replace('S', '') || "12:34"}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[2px] overflow-hidden pr-2">
                            <h3 className="font-semibold text-[14px] line-clamp-2 leading-tight tracking-tight group-hover:text-primary transition-colors">
                                {video.snippet.title}
                            </h3>
                            <div className="flex flex-col mt-1">
                                <p className="text-[12px] text-muted-foreground hover:text-foreground transition-colors truncate">
                                    {video.snippet.channelTitle}
                                </p>
                                <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
                                    <span>{formatViews(video.statistics?.viewCount)}</span>
                                    <span>•</span>
                                    <span>{formatRelativeTime(video.snippet.publishedAt)}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};
