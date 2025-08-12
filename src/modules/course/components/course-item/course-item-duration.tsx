'use client';

import { useEffect, useState } from 'react';

import { getCourseLessonsInfo } from '@/lib/actions/course.action';
import { IconClock } from '@/shared/components/icons';
import { formatMinutesToHour } from '@/utils';

interface ICourseItemDurationProps {
  slug: string;
}
const CourseItemDuration = ({ slug }: ICourseItemDurationProps) => {
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    async function getDuration() {
      const response = await getCourseLessonsInfo({ slug });

      setDuration(response?.duration || 0);
    }

    getDuration();
  }, [slug]);

  return (
    <div className="flex items-center gap-2">
      <IconClock className={'size-4'} />
      <span>{formatMinutesToHour(duration)}</span>
    </div>
  );
};

export default CourseItemDuration;
