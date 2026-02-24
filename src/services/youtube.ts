import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const youtubeApi = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
    },
});

// Add interceptor for logging
youtubeApi.interceptors.request.use((config) => {
    console.log(`YouTube API Request: ${config.url}`, config.params);
    if (!API_KEY) {
        console.warn('VITE_YOUTUBE_API_KEY is missing!');
    }
    return config;
});

youtubeApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('YouTube API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const youtubeService = {
    async getTrendingVideos() {
        const response = await youtubeApi.get('/videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                maxResults: 20,
                regionCode: 'US',
            },
        });
        return response.data.items;
    },

    async searchVideos(query: string) {
        const response = await youtubeApi.get('/search', {
            params: {
                part: 'snippet',
                q: query,
                maxResults: 50,
                type: 'video',
            },
        });
        return response.data.items;
    },

    async getVideoDetails(videoId: string) {
        const response = await youtubeApi.get('/videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                id: videoId,
            },
        });
        return response.data.items[0];
    },

    async getRelatedVideos(videoId: string) {
        try {
            // relatedToVideoId is deprecated and returns 400. 
            // We fallback to searching for videos with similar keywords.
            const video = await this.getVideoDetails(videoId);
            if (!video) return [];

            const query = video.snippet.tags?.[0] || video.snippet.title.split(' ')[0] || "trending";

            const response = await youtubeApi.get('/search', {
                params: {
                    part: 'snippet',
                    maxResults: 30,
                    type: 'video',
                    q: query,
                },
            });
            return response.data.items;
        } catch (error) {
            console.error('Related videos fetch failed fallback:', error);
            return [];
        }
    },

    async getChannelInfo(channelId: string) {
        const response = await youtubeApi.get('/channels', {
            params: {
                part: 'snippet,statistics',
                id: channelId,
            },
        });
        return response.data.items[0];
    },

    async getVideoDetailsByIds(videoIds: string[]) {
        const response = await youtubeApi.get('/videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                id: videoIds.join(','),
            },
        });
        return response.data.items;
    },

    async getChannelsInfoByIds(channelIds: string[]) {
        if (channelIds.length === 0) return [];
        const response = await youtubeApi.get('/channels', {
            params: {
                part: 'snippet,statistics',
                id: channelIds.join(','),
            },
        });
        return response.data.items;
    },

    async getVideoComments(videoId: string) {
        try {
            const response = await youtubeApi.get('/commentThreads', {
                params: {
                    part: 'snippet',
                    videoId: videoId,
                    maxResults: 20,
                    order: 'relevance',
                },
            });
            return response.data.items;
        } catch (error) {
            console.error('Comments fetch failed:', error);
            return [];
        }
    },
};
