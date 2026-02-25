import { Home as HomeIcon, Compass, UserCircle, History, PlayCircle, Clock, ThumbsUp, Library } from "lucide-react";

export const sidebarItems = [
    { icon: HomeIcon, label: "Home", path: "/" },
    { icon: Compass, label: "Shorts", path: "/shorts" },
    { icon: Library, label: "Subscriptions", path: "/subscriptions" },
];

export const mainItems = [
    { icon: UserCircle, label: "You", path: "/you" },
    { icon: History, label: "History", path: "/history" },
    { icon: PlayCircle, label: "Your videos", path: "/your-videos" },
    { icon: Clock, label: "Watch later", path: "/watch-later" },
    { icon: ThumbsUp, label: "Liked videos", path: "/liked-videos" },
];

export const subscriptionItems = [
    { label: "Vercel", avatar: "V" },
    { label: "Tailwind Labs", avatar: "T" },
    { label: "shadcn", avatar: "S" },
    { label: "React", avatar: "R" },
];
