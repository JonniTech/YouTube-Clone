import { Link } from "react-router-dom";
import { type YouTubeVideo } from "@/types/youtube";
import { formatViews, formatRelativeTime } from "@/lib/formatters";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VideoCardProps {
    video: YouTubeVideo;
}

export const VideoCard = ({ video }: VideoCardProps) => {
    const videoId = typeof video.id === 'string' ? video.id : video.id.videoId;
    const { snippet, statistics } = video;

    return (
        <Link to={`/watch/${videoId}`} className="group flex flex-col gap-3 transition-all duration-300 p-2 rounded-xl border border-transparent hover:border-border hover:bg-secondary/30 hover:shadow-lg">
            <div className="relative aspect-video w-full overflow-hidden rounded-[12px] bg-secondary group-hover:shadow-md transition-all duration-300">
                <img
                    src={snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url}
                    alt={snippet.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {video.contentDetails && (
                    <div className="absolute bottom-1.5 right-1.5 rounded-[4px] bg-black/80 px-1.5 py-0.5 text-[12px] font-medium text-white">
                        {video.contentDetails.duration.replace('PT', '').replace('H', ':').replace('M', ':').replace('S', '')}
                    </div>
                )}
            </div>
            <div className="flex gap-3 px-1">
                <Avatar className="h-9 w-9 mt-1 shrink-0">
                    {video.channelImage && <AvatarImage src={video.channelImage} alt={snippet.channelTitle} />}
                    <AvatarFallback className="bg-primary/10 text-[10px] text-primary font-medium">
                        {snippet.channelTitle[0]}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                    <h3 className="text-[16px] font-medium leading-[1.4] line-clamp-2 transition-colors">
                        {snippet.title}
                    </h3>
                    <div className="mt-1 flex flex-col">
                        <p className="text-[14px] text-muted-foreground hover:text-foreground transition-colors truncate">
                            {snippet.channelTitle}
                        </p>
                        <div className="flex items-center gap-1 text-[14px] text-muted-foreground">
                            <span>{formatViews(statistics?.viewCount)}</span>
                            <span className="text-[10px]">•</span>
                            <span>{formatRelativeTime(snippet.publishedAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
