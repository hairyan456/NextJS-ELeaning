'use client';

import { useRouter } from 'next/navigation';

import { IconArrowLeft, IconArrowRight } from '@/shared/components/icons';
import { Button } from '@/shared/components/ui/button';

interface ILessonNavigationProps {
  nextLesson: string;
  prevLesson: string;
}

const LessonNavigation = ({
  nextLesson,
  prevLesson,
}: ILessonNavigationProps) => {
  const router = useRouter();

  return (
    <div className="flex gap-3">
      <Button
        className="size-10 p-3 text-white"
        disabled={!prevLesson}
        onClick={() => (prevLesson ? router.push(prevLesson) : null)}
      >
        <IconArrowLeft />
      </Button>
      <Button
        className="size-10 p-3 text-white"
        disabled={!nextLesson}
        onClick={() => (nextLesson ? router.push(nextLesson) : null)}
      >
        <IconArrowRight />
      </Button>
    </div>
  );
};

export default LessonNavigation;
