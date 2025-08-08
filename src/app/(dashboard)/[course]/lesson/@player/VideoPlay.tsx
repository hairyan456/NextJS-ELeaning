'use client'
import { cn } from '@/lib/utils'
import MuxPlayer from '@mux/mux-player-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import LessonNavigation from '../LessonNavigation'
import useGlobalStore from '@/store'
import { Button } from '@/shared/components/ui/button'
import RatingButton from './RatingButton'

const VideoPlay = ({
  nextLesson,
  prevLesson,
  data,
}: {
  nextLesson: string
  prevLesson: string
  data: { userId: string; courseId: string }
}) => {
  const duration = 3000
  const [isEnded, setIsEnded] = useState(false)
  const router = useRouter()
  const { isExpandedPlayer, setIsExpandedPlayer } = useGlobalStore()

  useEffect(() => {
    if (!isEnded) return
    const timer = setTimeout(() => {
      router.push(nextLesson)
    }, duration)

    return () => clearTimeout(timer)
  }, [isEnded, nextLesson, router])

  return (
    <>
      <div className="relative mb-5 aspect-video">
        <div
          className={cn(
            `h-1.5 bg-gradient-to-r from-primary to-secondary absolute top-0 right-0
                z-10`,
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

      <div className="flex items-center justify-between mb-5">
        <LessonNavigation nextLesson={nextLesson} prevLesson={prevLesson} />
        <div className="flex gap-5">
          <RatingButton courseId={data.courseId} userId={data.userId} />
          <Button
            className="text-white"
            onClick={() => setIsExpandedPlayer(!isExpandedPlayer)}
          >
            {isExpandedPlayer ? 'Mặc định' : 'Mở rộng'}
          </Button>
        </div>
      </div>
    </>
  )
}

export default VideoPlay
