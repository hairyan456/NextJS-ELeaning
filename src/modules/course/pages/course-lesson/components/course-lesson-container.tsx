import { Suspense } from 'react';

import PageNotFound from '@/app/not-found';
import { getHistory } from '@/lib/actions/history.action';
import { countLessonsByCourseId } from '@/lib/actions/lesson.action';
import { fetchCourseBySlug } from '@/modules/course/actions';
import { CourseOutline, Loading } from '@/shared/components';
import { ICourseLessonPageRootProps } from '@/shared/types';

import CourseLessonComment from './course-lesson-comment';
import CourseLessonOutline from './course-lesson-outline';
import CourseLessonPlayer from './course-lesson-player';
import LoadingPlayer from './course-lesson-player/loading-player';
import LessonWrapper from './lesson-wrapper';

interface ICourseLessonContainerProps extends ICourseLessonPageRootProps {}
const CourseLessonContainer = async ({
  params,
  searchParams,
}: ICourseLessonContainerProps) => {
  const courseSlug = params.course;
  const lessonSlug = searchParams.slug;
  const findCourse = await fetchCourseBySlug({ slug: courseSlug });

  if (!findCourse?._id) return <PageNotFound />;
  const courseId = findCourse?._id.toString();
  const lectures = findCourse?.lectures || [];
  const histories = await getHistory({ course: courseId || '' });
  const lessonsCount = await countLessonsByCourseId({ courseId });
  const completePercentage =
    ((histories?.length || 0) / (lessonsCount || 1)) * 100;

  return (
    <LessonWrapper courseId={courseId}>
      <div>
        <Suspense fallback={<LoadingPlayer />}>
          <CourseLessonPlayer
            courseId={courseId}
            courseSlug={courseSlug}
            lessonSlug={lessonSlug}
          />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <CourseLessonComment
            courseId={courseId}
            lessonSlug={lessonSlug}
            sort={searchParams.sort}
          />
        </Suspense>
      </div>
      <CourseLessonOutline completePercentage={completePercentage}>
        <CourseOutline
          course={courseSlug}
          histories={histories ? JSON.parse(JSON.stringify(histories)) : []}
          lectures={lectures}
          slug={lessonSlug}
        />
      </CourseLessonOutline>
    </LessonWrapper>
  );
};

export default CourseLessonContainer;
