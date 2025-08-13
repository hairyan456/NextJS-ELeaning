'use client';
import Link from 'next/link';

import { createNewHistory } from '@/lib/actions/history.action';
import { cn } from '@/lib/utils';
import { IconPlay } from '@/shared/components/icons';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { IHistoryItemData, ILessonItemData } from '@/shared/types';

interface ICourseLessonItem {
  lesson: ILessonItemData;
  histories?: IHistoryItemData[];
  course: string;
  slug: string;
}

const CourseLessonItem = ({
  course = '',
  histories = [],
  lesson,
  slug,
}: ICourseLessonItem) => {
  if (!lesson?._id) return null;

  const isActive = lesson.slug === slug;
  const lessonItem = JSON.parse(JSON.stringify(lesson));
  const url = course ? `/${course}/lesson?slug=${lesson.slug}` : '';
  const isChecked =
    histories.some(
      (element) => element.lesson.toString() === lesson._id.toString(),
    ) || false;

  const handleCompleteLesson = async (checked: boolean | string) => {
    try {
      await createNewHistory({
        course: lessonItem.course,
        lesson: lessonItem._id,
        checked,
        path: url || '/',
      });
    } catch (error) {
      console.error('Error when checking lesson:', error);
    }
  };

  return (
    <div
      className={cn(
        'bgDarkMode borderDarkMode flex items-center gap-3 rounded-lg p-4 text-sm font-medium',
        isActive ? 'font-bold' : '',
      )}
    >
      {!!url && (
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
          {lessonItem.title}
        </Link>
      ) : (
        <h4 className="line-clamp-1">{lessonItem.title || ''}</h4>
      )}
      <span className="ml-auto shrink-0 text-xs font-semibold">
        {lessonItem.duration} phút
      </span>
    </div>
  );
};

export default CourseLessonItem;
