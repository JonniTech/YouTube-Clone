interface VideoPlayerProps {
    videoId: string;
}

export const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
            />
        </div>
    );
};
