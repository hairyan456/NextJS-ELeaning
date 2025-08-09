'use client';

import { useRouter } from 'next/navigation';

import { IconArrowLeft, IconArrowRight } from '@/shared/components/icons';
import { Button } from '@/shared/components/ui/button';

const LessonNavigation = ({
  nextLesson,
  prevLesson,
}: {
  nextLesson: string;
  prevLesson: string;
}) => {
  const router = useRouter();

  return (
    <div className="flex gap-3">
      <Button
        className="size-10 p-3 text-white"
        disabled={!prevLesson}
        onClick={() => (!prevLesson ? null : router.push(prevLesson))}
      >
        <IconArrowLeft />
      </Button>
      <Button
        className="size-10 p-3 text-white"
        disabled={!nextLesson}
        onClick={() => (!nextLesson ? null : router.push(nextLesson))}
      >
        <IconArrowRight />
      </Button>
    </div>
  );
};

export default LessonNavigation;
