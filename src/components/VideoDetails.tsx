import type { YouTubeVideo } from "@/types/youtube";
import { formatViews, formatRelativeTime, formatCount } from "@/lib/formatters";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VideoDetailsProps {
    video: YouTubeVideo;
}

export const VideoDetails = ({ video }: VideoDetailsProps) => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold line-clamp-2 leading-relaxed">{video.snippet.title}</h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                        {video.channelImage && <AvatarImage src={video.channelImage} alt={video.snippet.channelTitle} />}
                        <AvatarFallback className="bg-primary/10 text-xs text-primary font-bold">
                            {video.snippet.channelTitle[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-semibold text-[16px] leading-tight cursor-pointer">
                            {video.snippet.channelTitle}
                        </span>
                        <span className="text-[12px] text-muted-foreground">
                            {video.subscriberCount ? `${formatCount(video.subscriberCount)} subscribers` : "Subscriber count unavailable"}
                        </span>
                    </div>
                    <Button className="rounded-full ml-4 font-semibold px-4 py-0 h-9 bg-foreground text-background hover:bg-foreground/90 transition-all">
                        Subscribe
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-full bg-secondary">
                        <Button variant="ghost" size="sm" className="rounded-l-full gap-2 hover:bg-muted">
                            <ThumbsUp className="h-4 w-4" />
                            <span className="text-xs">{formatViews(video.statistics?.likeCount)}</span>
                        </Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="ghost" size="sm" className="rounded-r-full hover:bg-muted">
                            <ThumbsDown className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button variant="secondary" size="sm" className="rounded-full gap-2">
                        <Share2 className="h-4 w-4" />
                        <span className="text-xs">Share</span>
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="rounded-xl bg-secondary/30 p-3 text-[14px] shadow-sm border border-border/20 mt-2 hover:bg-secondary/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-2 font-semibold mb-1">
                    <span>{formatViews(video.statistics?.viewCount)}</span>
                    <span>{formatRelativeTime(video.snippet.publishedAt)}</span>
                </div>
                <p className="whitespace-pre-wrap line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                    {video.snippet.description}
                </p>
                <Button variant="ghost" size="sm" className="mt-2 h-auto p-0 font-semibold hover:bg-transparent">
                    Show more
                </Button>
            </div>
        </div>
    );
};
