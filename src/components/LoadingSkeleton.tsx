import { Skeleton } from "@/components/ui/skeleton";

export const VideoGridSkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                    <Skeleton className="aspect-video w-full rounded-xl" />
                    <div className="flex gap-3">
                        <Skeleton className="h-9 w-9 rounded-full shrink-0" />
                        <div className="flex flex-col gap-2 w-full">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                            <Skeleton className="h-3 w-1/4" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const VideoDetailsSkeleton = () => {
    return (
        <div className="max-w-[1700px] mx-auto px-4 md:px-6 py-4 xl:px-12 flex flex-col gap-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start w-full max-w-full">
                {/* Main Content Skeleton Column */}
                <div className="flex-1 flex flex-col gap-8 min-w-0 w-full max-w-full">
                    <div className="flex flex-col gap-4">
                        <Skeleton className="aspect-video w-full rounded-xl" />
                        <Skeleton className="h-7 w-3/4" />
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                                <Skeleton className="h-9 w-24 rounded-full ml-4" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-9 w-24 rounded-full" />
                                <Skeleton className="h-9 w-24 rounded-full" />
                            </div>
                        </div>
                        <Skeleton className="h-28 w-full rounded-xl mt-2" />
                    </div>

                    {/* Mobile Related Videos Skeleton (visible only on md/smaller) */}
                    <div className="lg:hidden flex flex-col gap-4">
                        <Skeleton className="h-5 w-24 uppercase ml-1" />
                        <div className="flex flex-col gap-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="flex gap-3">
                                    <Skeleton className="aspect-video h-[94px] rounded-lg shrink-0" />
                                    <div className="flex flex-col gap-2 w-full pt-1">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-3 w-3/4" />
                                        <Skeleton className="h-3 w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Comments Skeleton */}
                    <div className="flex flex-col gap-6 px-2">
                        <div className="flex items-center gap-6">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-5 w-24" />
                        </div>
                        <div className="flex flex-col gap-8">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="flex gap-4">
                                    <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                                    <div className="flex flex-col gap-3 w-full">
                                        <div className="flex gap-2">
                                            <Skeleton className="h-3 w-24" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Skeleton className="h-3 w-full" />
                                            <Skeleton className="h-3 w-[90%]" />
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <Skeleton className="h-4 w-4 rounded" />
                                            <Skeleton className="h-4 w-4 rounded" />
                                            <Skeleton className="h-4 w-12 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desktop Sidebar Skeleton (visible only on lg/larger) */}
                <div className="hidden lg:flex lg:w-[350px] xl:w-[400px] shrink-0 flex-col gap-4 sticky top-4">
                    <Skeleton className="h-5 w-24 uppercase" />
                    <div className="flex flex-col gap-3">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="flex gap-3">
                                <Skeleton className="aspect-video h-[94px] rounded-lg shrink-0" />
                                <div className="flex flex-col gap-2 w-full pt-1">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-3 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SearchPageSkeleton = () => {
    return (
        <div className="max-w-[1300px] mx-auto flex flex-col gap-4 px-4 md:px-8 py-8">
            {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4 p-2">
                    <Skeleton className="aspect-video w-full sm:w-[420px] rounded-xl shrink-0" />
                    <div className="flex flex-col gap-3 flex-grow py-1">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/4 mt-1" />
                        <div className="flex items-center gap-3 my-2">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-[80%]" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
