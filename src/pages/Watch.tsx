import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VideoPlayer } from "@/components/VideoPlayer";
import { VideoDetails } from "@/components/VideoDetails";
import { VideoComments } from "@/components/VideoComments";
import { RelatedVideos } from "@/components/RelatedVideos";
import { VideoDetailsSkeleton } from "@/components/LoadingSkeleton";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Separator } from "@/components/ui/separator";
import { youtubeService } from "@/services/youtube";
import type { YouTubeVideo } from "@/types/youtube";

export default function Watch() {
    const { videoId } = useParams();
    const [video, setVideo] = useState<YouTubeVideo | null>(null);
    const [relatedVideos, setRelatedVideos] = useState<YouTubeVideo[]>([]);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            if (!videoId) return;
            try {
                setLoading(true);
                const [details, relatedSearchItems, commentThreads] = await Promise.all([
                    youtubeService.getVideoDetails(videoId),
                    youtubeService.getRelatedVideos(videoId),
                    youtubeService.getVideoComments(videoId),
                ]);

                // 1. Get Full Video Details for Related Videos
                const relatedVideoIds = relatedSearchItems.map((v: any) => v.id.videoId).filter(Boolean);
                const relatedDetails = await youtubeService.getVideoDetailsByIds(relatedVideoIds);
                const relatedDetailsMap = relatedDetails.reduce((acc: any, video: any) => {
                    acc[video.id] = video;
                    return acc;
                }, {});

                // 2. Get Channel Info for all channels (main + related)
                const channelIds = Array.from(new Set([
                    details.snippet.channelId,
                    ...relatedSearchItems.map((v: any) => v.snippet.channelId)
                ])) as string[];
                const channels = await youtubeService.getChannelsInfoByIds(channelIds);
                const channelMap = channels.reduce((acc: any, channel: any) => {
                    acc[channel.id] = {
                        image: channel.snippet.thumbnails.default.url,
                        subscriberCount: channel.statistics?.subscriberCount
                    };
                    return acc;
                }, {});

                const enrichedVideo = {
                    ...details,
                    channelImage: channelMap[details.snippet.channelId]?.image,
                    subscriberCount: channelMap[details.snippet.channelId]?.subscriberCount
                };

                const enrichedRelated = relatedSearchItems.map((item: any) => {
                    const vId = item.id.videoId;
                    const vDetails = relatedDetailsMap[vId];
                    return {
                        ...item,
                        statistics: vDetails?.statistics,
                        contentDetails: vDetails?.contentDetails,
                        channelImage: channelMap[item.snippet.channelId]?.image
                    };
                });

                setVideo(enrichedVideo);
                setRelatedVideos(enrichedRelated);
                setComments(commentThreads);
            } catch (err: any) {
                const message = err.response?.data?.error?.message || err.message || "Failed to fetch video details.";
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchVideoData();
        window.scrollTo(0, 0); // Scroll to top when video changes
    }, [videoId]);

    if (loading) return <VideoDetailsSkeleton />;
    if (error) return <ErrorAlert message={error} />;
    if (!video) return <ErrorAlert message="Video not found." />;

    return (
        <div className="max-w-[1700px] mx-auto px-4 md:px-6 py-4 xl:px-12 flex flex-col gap-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="flex-1 flex flex-col gap-8 min-w-0">
                    <div className="flex flex-col gap-4">
                        <VideoPlayer videoId={videoId as string} />
                        <VideoDetails video={video} />
                    </div>

                    {comments.length > 0 && (
                        <div className="flex flex-col gap-6">
                            <Separator className="bg-border/40" />
                            <VideoComments
                                comments={comments}
                                totalComments={video.statistics?.commentCount}
                            />
                        </div>
                    )}
                </div>
                <div className="lg:w-[350px] xl:w-[400px] shrink-0 flex flex-col gap-4 sticky top-4">
                    <h2 className="font-semibold text-base tracking-tight text-muted-foreground uppercase">Up next</h2>
                    <RelatedVideos videos={relatedVideos.slice(0, 12)} />
                </div>
            </div>
        </div>
    );
}
