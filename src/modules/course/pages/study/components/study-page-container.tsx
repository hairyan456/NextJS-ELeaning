'use client';

import { useEffect, useState } from 'react';

import CourseItem from '@/modules/course/components/course-item';
import { ICourseItemData, ILastLessonData } from '@/modules/course/types';
import { CourseGrid } from '@/shared/components';
import { lastLessonKey } from '@/shared/constants';

interface IStudyPageContainerProps {
  courses: ICourseItemData[] | null | undefined;
}
const StudyPageContainer = ({ courses }: IStudyPageContainerProps) => {
  const [lastLesson, setLastLesson] = useState<ILastLessonData[]>([]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const lesson = localStorage
        ? JSON.parse(localStorage?.getItem(lastLessonKey) || '[]') || []
        : [];

      setLastLesson(lesson);
    }
  }, []);

  if (!courses || courses.length <= 0) return null;

  return (
    <CourseGrid>
      {courses.map((item) => {
        const firstLessonUrl = item.lectures[0]?.lessons[0]?.slug;
        const lastURL =
          lastLesson?.find((element) => element?.course === item.slug)
            ?.lesson || `${item.slug}/lesson?slug=${firstLessonUrl}`;

        return (
          <CourseItem
            key={item.slug}
            cta={'Tiếp tục học'}
            data={item}
            url={lastURL}
          />
        );
      })}
    </CourseGrid>
  );
};

export default StudyPageContainer;
