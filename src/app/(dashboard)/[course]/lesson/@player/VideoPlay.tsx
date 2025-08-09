'use client';
import MuxPlayer from '@mux/mux-player-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import useGlobalStore from '@/store';

import LessonNavigation from '../LessonNavigation';
import RatingButton from './RatingButton';

const VideoPlay = ({
  data,
  nextLesson,
  prevLesson,
}: {
  nextLesson: string;
  prevLesson: string;
  data: { userId: string; courseId: string };
}) => {
  const duration = 3000;
  const [isEnded, setIsEnded] = useState(false);
  const router = useRouter();
  const { isExpandedPlayer, setIsExpandedPlayer } = useGlobalStore();

  useEffect(() => {
    if (!isEnded) return;
    const timer = setTimeout(() => {
      router.push(nextLesson);
    }, duration);

    return () => clearTimeout(timer);
  }, [isEnded, nextLesson, router]);

  return (
    <>
      <div className="relative mb-5 aspect-video">
        <div
          className={cn(
            'absolute right-0 top-0 z-10 h-1.5 bg-gradient-to-r from-primary to-secondary',
            isEnded ? 'animate-bar' : '',
          )}
        />

        <MuxPlayer
          metadataVideoTitle="Placeholder (optional)"
          metadataViewerUserId="Placeholder (optional)"
          playbackId="cLtCRXwXHA016mp005eh3cT5fWreC3VSv00VnhXvXzSJ9E"
          primaryColor="#FFFFFF"
          secondaryColor="#000000"
          streamType="on-demand"
          onEnded={() => setIsEnded(true)}
          onPlay={() => setIsEnded(false)}
        />
      </div>

      <div className="mb-5 flex items-center justify-between">
        <LessonNavigation
          nextLesson={nextLesson}
          prevLesson={prevLesson}
        />
        <div className="flex gap-5">
          <RatingButton
            courseId={data.courseId}
            userId={data.userId}
          />
          <Button
            className="text-white"
            onClick={() => setIsExpandedPlayer(!isExpandedPlayer)}
          >
            {isExpandedPlayer ? 'Mặc định' : 'Mở rộng'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default VideoPlay;
