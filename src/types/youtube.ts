export interface YouTubeVideo {
    id: string | { videoId: string };
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            default: Thumbnail;
            medium: Thumbnail;
            high: Thumbnail;
            standard?: Thumbnail;
            maxres?: Thumbnail;
        };
        channelTitle: string;
        tags?: string[];
        categoryId: string;
        liveBroadcastContent: string;
        localized: {
            title: string;
            description: string;
        };
    };
    contentDetails?: {
        duration: string;
        dimension: string;
        definition: string;
        caption: string;
        licensedContent: boolean;
        contentRating: object;
        projection: string;
    };
    statistics?: {
        viewCount: string;
        likeCount: string;
        favoriteCount: string;
        commentCount: string;
    };
    channelImage?: string;
    subscriberCount?: string;
}

interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

export interface YouTubeChannel {
    id: string;
    snippet: {
        title: string;
        description: string;
        customUrl: string;
        publishedAt: string;
        thumbnails: {
            default: Thumbnail;
            medium: Thumbnail;
            high: Thumbnail;
        };
        localized: {
            title: string;
            description: string;
        };
    };
    statistics: {
        viewCount: string;
        subscriberCount: string;
        hiddenSubscriberCount: boolean;
        videoCount: string;
    };
}

export interface YouTubeComment {
    id: string;
    snippet: {
        authorDisplayName: string;
        authorProfileImageUrl: string;
        authorChannelUrl: string;
        textDisplay: string;
        textOriginal: string;
        likeCount: number;
        publishedAt: string;
        updatedAt: string;
    };
}

export interface YouTubeCommentThread {
    id: string;
    snippet: {
        videoId: string;
        topLevelComment: {
            id: string;
            snippet: YouTubeComment['snippet'];
        };
        totalReplyCount: number;
        isPublic: boolean;
    };
}
