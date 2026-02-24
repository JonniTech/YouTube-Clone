import { useEffect, useState } from "react";
import { VideoGrid } from "@/components/VideoGrid";
import { VideoGridSkeleton } from "@/components/LoadingSkeleton";
import { CategoryFilters } from "@/components/CategoryFilters";
import { ErrorAlert } from "@/components/ErrorAlert";
import { youtubeService } from "@/services/youtube";
import type { YouTubeVideo } from "@/types/youtube";

export default function Home() {
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                setError(null);

                let data;
                if (selectedCategory === "All") {
                    data = await youtubeService.getTrendingVideos();
                } else {
                    // Search for videos by category keyword
                    const searchResults = await youtubeService.searchVideos(selectedCategory);
                    const videoIds = searchResults.map((item: any) =>
                        typeof item.id === 'string' ? item.id : item.id.videoId
                    ).filter(Boolean);

                    if (videoIds.length > 0) {
                        data = await youtubeService.getVideoDetailsByIds(videoIds);
                    } else {
                        data = [];
                    }
                }

                // Enrich videos with channel profile images
                if (data && data.length > 0) {
                    const channelIds = Array.from(new Set(data.map((v: any) => v.snippet.channelId)));
                    const channels = await youtubeService.getChannelsInfoByIds(channelIds as string[]);
                    const channelImageMap = channels.reduce((acc: any, channel: any) => {
                        acc[channel.id] = channel.snippet.thumbnails.default.url;
                        return acc;
                    }, {});

                    data = data.map((v: any) => ({
                        ...v,
                        channelImage: channelImageMap[v.snippet.channelId]
                    }));
                }

                setVideos(data);
            } catch (err) {
                setError("Failed to fetch videos. Please check your API key.");
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [selectedCategory]);

    if (error) return <ErrorAlert message={error} />;

    return (
        <div className="flex flex-col">
            <CategoryFilters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />
            <div className="px-6 py-6 transition-opacity duration-300">
                {loading ? (
                    <VideoGridSkeleton />
                ) : (
                    <VideoGrid videos={videos} />
                )}
            </div>
        </div>
    );
}
