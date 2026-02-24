import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchVideoCard } from "@/components/SearchVideoCard";
import { SearchPageSkeleton } from "@/components/LoadingSkeleton";
import { ErrorAlert } from "@/components/ErrorAlert";
import { youtubeService } from "@/services/youtube";
import type { YouTubeVideo } from "@/types/youtube";

export default function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) return;
            try {
                setLoading(true);
                const searchItems = await youtubeService.searchVideos(query);

                // 1. Get Video IDs for full details (statistics, contentDetails)
                const videoIds = searchItems.map((v: any) => v.id.videoId).filter(Boolean);
                const videoDetails = await youtubeService.getVideoDetailsByIds(videoIds);
                const videoDetailsMap = videoDetails.reduce((acc: any, video: any) => {
                    acc[video.id] = video;
                    return acc;
                }, {});

                // 2. Get Channel IDs for avatars
                const channelIds = Array.from(new Set(searchItems.map((v: any) => v.snippet.channelId))) as string[];
                const channels = await youtubeService.getChannelsInfoByIds(channelIds);
                const channelMap = channels.reduce((acc: any, channel: any) => {
                    acc[channel.id] = channel.snippet.thumbnails.default.url;
                    return acc;
                }, {});

                // 3. Combine search items with full details and channel images
                const enrichedVideos = searchItems.map((item: any) => {
                    const videoId = item.id.videoId;
                    const details = videoDetailsMap[videoId];
                    return {
                        ...item,
                        statistics: details?.statistics,
                        contentDetails: details?.contentDetails,
                        channelImage: channelMap[item.snippet.channelId]
                    };
                });

                setVideos(enrichedVideos);
            } catch (err) {
                setError("Failed to fetch search results. Please check your API key.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    if (loading) return <SearchPageSkeleton />;
    if (error) return <ErrorAlert message={error} />;

    return (
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-8">
            <div className="flex flex-col gap-5">
                {videos.map((video, index) => (
                    <SearchVideoCard key={index} video={video} />
                ))}
            </div>
        </div>
    );
}
