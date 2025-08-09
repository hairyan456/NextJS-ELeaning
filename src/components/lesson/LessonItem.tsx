'use client'
import Link from 'next/link'
import { IconPlay } from '../../shared/components/icons'
import { cn } from '@/lib/utils'
import { createNewHistory } from '@/lib/actions/history.action'
import { Checkbox } from '@/shared/components/ui/checkbox'

interface ILessonItem {
  lesson: {
    title: string
    duration: number
    course: string
    _id: string
  }
  url?: string
  isActive?: boolean
  isChecked?: boolean
}

const LessonItem = ({
  lesson,
  url,
  isActive = false,
  isChecked = false,
}: ILessonItem) => {
  const handleCompleteLesson = async (checked: boolean | string) => {
    try {
      await createNewHistory({
        course: lesson.course,
        lesson: lesson._id,
        checked,
        path: url,
      })
    } catch (error) {
      console.error('Error when checking lesson:', error)
    }
  }

  return (
    <div
      className={cn(
        'bgDarkMode borderDarkMode flex items-center gap-3 rounded-lg p-4 text-sm font-medium',
        isActive ? 'font-bold' : '',
      )}
    >
      {url && (
        <Checkbox
          className="size-4 shrink-0"
          defaultChecked={isChecked}
          onCheckedChange={(checked) => handleCompleteLesson(checked)}
        />
      )}
      <IconPlay className="size-5 shrink-0" />
      {url ? (
        <Link
          className={cn('line-clamp-1', isActive && 'pointer-events-none')}
          href={url}
        >
          {lesson.title}
        </Link>
      ) : (
        <h4 className="line-clamp-1">{lesson.title || ''}</h4>
      )}
      <span className="ml-auto shrink-0 text-xs font-semibold">
        {lesson.duration} phút
      </span>
    </div>
  )
}

export default LessonItem
