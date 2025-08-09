'use client';

import { useEffect } from 'react';

import { lastLessonKey } from '@/shared/constants';

const LessonSaveUrl = ({ course, url }: { url: string; course: string }) => {
  useEffect(() => {
    let results: any[] = localStorage?.getItem(lastLessonKey)
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
