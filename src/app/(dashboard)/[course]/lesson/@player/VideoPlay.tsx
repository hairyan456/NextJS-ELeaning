'use client';
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LessonNavigation from "../LessonNavigation";
import useGlobalStore from "@/store";
import { Button } from "@/components/ui/button";

const VideoPlay = ({ nextLesson, prevLesson }: { nextLesson: string; prevLesson: string; }) => {
    const duration = 3000;
    const [isEnded, setIsEnded] = useState(false);
    const router = useRouter();
    const { expandedPlayer, setExpandedPlayer } = useGlobalStore();

    useEffect(() => {
        if (!isEnded) return;
        const timer = setTimeout(() => {
            router.push(nextLesson);
        }, duration);

        return () => clearTimeout(timer);
    }, [isEnded, nextLesson]);

    return (
        <>
            <div className="relative mb-5 aspect-video">
                <div
                    className={cn(`h-1.5 bg-gradient-to-r from-primary to-secondary absolute top-0 right-0
                z-10`, isEnded ? "animate-bar" : "")}
                />

                <MuxPlayer
                    streamType="on-demand"
                    playbackId="cLtCRXwXHA016mp005eh3cT5fWreC3VSv00VnhXvXzSJ9E"
                    metadataVideoTitle="Placeholder (optional)"
                    metadataViewerUserId="Placeholder (optional)"
                    primaryColor="#FFFFFF"
                    secondaryColor="#000000"
                    onEnded={() => setIsEnded(true)}
                    onPlay={() => setIsEnded(false)}
                />
            </div>

            <div className="flex items-center justify-between mb-5">
                <LessonNavigation
                    nextLesson={nextLesson}
                    prevLesson={prevLesson}
                />
                <Button className="text-white" onClick={() => setExpandedPlayer(!expandedPlayer)}>
                    {expandedPlayer ? "Mặc định" : "Mở rộng"}
                </Button>
            </div>
        </>
    );
};

export default VideoPlay;