import type { YouTubeCommentThread } from "@/types/youtube";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelativeTime, formatCount } from "@/lib/formatters";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface VideoCommentsProps {
    comments: YouTubeCommentThread[];
    totalComments?: string;
}

export const VideoComments = ({ comments, totalComments }: VideoCommentsProps) => {
    return (
        <div className="flex flex-col gap-6 px-2">
            <div className="flex items-center gap-6">
                <h2 className="text-xl font-bold">
                    {totalComments ? `${formatCount(totalComments)} Comments` : "Comments"}
                </h2>
                <div className="flex items-center gap-2 cursor-pointer font-semibold text-sm">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                        <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
                    </svg>
                    <span>Sort by</span>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {comments.map((thread) => {
                    const comment = thread.snippet.topLevelComment.snippet;
                    return (
                        <div key={thread.id} className="flex gap-4">
                            <Avatar className="h-10 w-10 shrink-0 cursor-pointer">
                                <AvatarImage src={comment.authorProfileImageUrl} alt={comment.authorDisplayName} />
                                <AvatarFallback className="bg-primary/10 text-xs font-bold">
                                    {comment.authorDisplayName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[13px] font-bold cursor-pointer">
                                        {comment.authorDisplayName}
                                    </span>
                                    <span className="text-[12px] text-muted-foreground">
                                        {formatRelativeTime(comment.publishedAt)}
                                    </span>
                                </div>
                                <p className="text-[14px] whitespace-pre-wrap leading-relaxed">
                                    {comment.textDisplay.replace(/<br>/g, '\n')}
                                </p>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center gap-1.5 cursor-pointer group">
                                        <ThumbsUp className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                        {comment.likeCount > 0 && (
                                            <span className="text-[12px] text-muted-foreground group-hover:text-foreground">
                                                {formatCount(comment.likeCount.toString())}
                                            </span>
                                        )}
                                    </div>
                                    <div className="cursor-pointer group">
                                        <ThumbsDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    </div>
                                    <span className="text-[12px] font-bold cursor-pointer hover:bg-muted px-3 py-1.5 rounded-full transition-colors">
                                        Reply
                                    </span>
                                </div>
                                {thread.snippet.totalReplyCount > 0 && (
                                    <div className="mt-1 flex items-center gap-2 text-blue-500 font-bold text-[14px] cursor-pointer hover:bg-blue-500/10 w-fit px-3 py-1.5 rounded-full transition-colors">
                                        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                                            <path d="m18 9.28-6.35 6.35-6.37-6.35.72-.71 5.64 5.65 5.65-5.65z"></path>
                                        </svg>
                                        <span>{thread.snippet.totalReplyCount} {thread.snippet.totalReplyCount === 1 ? 'reply' : 'replies'}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
