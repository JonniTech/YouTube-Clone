import { Link } from "react-router-dom";
import { type YouTubeVideo } from "@/types/youtube";
import { formatViews, formatRelativeTime } from "@/lib/formatters";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SearchVideoCardProps {
    video: YouTubeVideo;
}

export const SearchVideoCard = ({ video }: SearchVideoCardProps) => {
    const videoId = typeof video.id === 'string' ? video.id : video.id.videoId;
    const { snippet, statistics } = video;

    return (
        <Link to={`/watch/${videoId}`} className="group flex flex-col sm:flex-row gap-4 transition-all duration-300 p-2 rounded-xl border border-transparent hover:bg-secondary/30">
            {/* Thumbnail */}
            <div className="relative aspect-video w-full sm:w-[420px] flex-shrink-0 overflow-hidden rounded-xl bg-secondary">
                <img
                    src={snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url}
                    alt={snippet.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {video.contentDetails && (
                    <div className="absolute bottom-1.5 right-1.5 rounded-[4px] bg-black/80 px-1.5 py-0.5 text-[12px] font-medium text-white">
                        {video.contentDetails.duration.replace('PT', '').replace('H', ':').replace('M', ':').replace('S', '')}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 flex-grow overflow-hidden py-1">
                <h3 className="text-[18px] font-medium leading-[1.4] line-clamp-2 desktop:text-xl transition-colors group-hover:text-foreground/90">
                    {snippet.title}
                </h3>

                <div className="flex items-center gap-1 text-[13px] text-muted-foreground">
                    <span>{formatViews(statistics?.viewCount)} views</span>
                    <span className="text-[10px]">•</span>
                    <span>{formatRelativeTime(snippet.publishedAt)}</span>
                </div>

                <div className="flex items-center gap-3 my-2">
                    <Avatar className="h-6 w-6 shrink-0">
                        {video.channelImage && <AvatarImage src={video.channelImage} alt={snippet.channelTitle} />}
                        <AvatarFallback className="bg-primary/10 text-[8px] text-primary font-medium">
                            {snippet.channelTitle[0]}
                        </AvatarFallback>
                    </Avatar>
                    <p className="text-[13px] text-muted-foreground hover:text-foreground transition-colors truncate">
                        {snippet.channelTitle}
                    </p>
                </div>

                <p className="text-[13px] text-muted-foreground line-clamp-1 sm:line-clamp-2">
                    {snippet.description}
                </p>
            </div>
        </Link>
    );
};
