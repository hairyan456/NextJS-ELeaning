import { findAllLessons } from '@/lib/actions/lesson.action';
import { Heading } from '@/shared/components';

import LessonSaveUrl from './lesson-save-url';
import VideoPlay from './video-play';

interface ICourseLessonPlayerProps {
  courseId: string;
  lessonSlug: string;
  courseSlug: string;
}
const CourseLessonPlayer = async ({
  courseId,
  courseSlug,
  lessonSlug,
}: ICourseLessonPlayerProps) => {
  const listLessons = await findAllLessons({ course: courseId || '' });
  const lessonDetail = listLessons?.find((l) => l.slug === lessonSlug);

  if (!lessonDetail?._id) return null;

  const currentLessonIndex =
    listLessons?.findIndex((l) => l.slug === lessonSlug) || 0;
  const nextLesson = listLessons?.[currentLessonIndex + 1];
  const previousLesson = listLessons?.[currentLessonIndex - 1];
  const nextLessonUrl = nextLesson
    ? `/${courseSlug}/lesson?slug=${nextLesson?.slug}`
    : '';
  const previousLessonUrl = previousLesson
    ? `/${courseSlug}/lesson?slug=${previousLesson?.slug}`
    : '';

  return (
    <div className="mb-5">
      <LessonSaveUrl
        course={courseSlug}
        url={`/${courseSlug}/lesson?slug=${lessonSlug}`}
      />

      <VideoPlay
        courseId={courseId}
        nextLesson={nextLessonUrl}
        prevLesson={previousLessonUrl}
      />
      <Heading className="mb-10">{lessonDetail.title}</Heading>
      <div className="bgDarkMode borderDarkMode entry-content rounded-lg p-5">
        <div
          dangerouslySetInnerHTML={{ __html: lessonDetail?.content || '' }}
        />
      </div>
    </div>
  );
};

export default CourseLessonPlayer;
