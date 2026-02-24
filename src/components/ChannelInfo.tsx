import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { YouTubeChannel } from "@/types/youtube";

interface ChannelInfoProps {
    channel: YouTubeChannel;
}

export const ChannelInfo = ({ channel }: ChannelInfoProps) => {
    if (!channel) return null;

    return (
        <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
                <AvatarImage src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} />
                <AvatarFallback>{channel.snippet.title[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <h3 className="font-semibold text-sm">{channel.snippet.title}</h3>
                <p className="text-xs text-muted-foreground">
                    {parseInt(channel.statistics.subscriberCount).toLocaleString()} subscribers
                </p>
            </div>
        </div>
    );
};
