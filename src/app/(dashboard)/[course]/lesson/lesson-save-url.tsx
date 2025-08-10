'use client';

import { useEffect } from 'react';

import { lastLessonKey } from '@/shared/constants';

interface ILessonSaveUrlProps {
  url: string;
  course: string;
}
const LessonSaveUrl = ({ course, url }: ILessonSaveUrlProps) => {
  useEffect(() => {
    let results: { course: string }[] = localStorage?.getItem(lastLessonKey)
      ? JSON.parse(localStorage.getItem(lastLessonKey) || '[]')
      : [];
    const item = {
      course,
      lesson: url,
    };

    results = results.filter((item) => item.course !== course);
    results.push(item);
    localStorage.setItem(lastLessonKey, JSON.stringify(results));
  }, [url, course]);

  return <></>;
};

export default LessonSaveUrl;
