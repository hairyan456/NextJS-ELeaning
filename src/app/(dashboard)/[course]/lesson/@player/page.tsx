import { auth } from '@clerk/nextjs/server';

import PageNotFound from '@/app/not-found';
import { findAllLessons } from '@/lib/actions/lesson.action';
import { getUserInfo } from '@/lib/actions/user.actions';
import { fetchCourseBySlug } from '@/modules/course/actions';
import { Heading } from '@/shared/components';

import LessonSaveUrl from '../lesson-save-url';
import VideoPlay from './video-play';

const page = async ({
  params,
  searchParams,
}: {
  params: { course: string };
  searchParams: { slug: string };
}) => {
  const { userId } = await auth();
  const findUser = await getUserInfo({ userId: userId! });

  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await fetchCourseBySlug({ slug: course });

  if (!findCourse?._id) return <PageNotFound />;
  const courseId = findCourse?._id.toString();
  const listLessons = await findAllLessons({ course: courseId || '' });
  const lessonDetail = listLessons?.find((l) => l.slug === slug);

  if (!lessonDetail?._id) return <PageNotFound />;
  const currentLessonIndex =
    listLessons?.findIndex((l) => l.slug === slug) || 0;
  const nextLesson = listLessons?.[currentLessonIndex + 1];
  const previousLesson = listLessons?.[currentLessonIndex - 1];

  return (
    <div className="mb-5">
      <LessonSaveUrl
        course={course}
        url={`/${course}/lesson?slug=${slug}`}
      />
      {/* <iframe
                        className="w-full h-full object-cover"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    /> */}
      <VideoPlay
        data={{
          userId: findUser?._id || '',
          courseId,
        }}
        nextLesson={
          nextLesson ? `/${course}/lesson?slug=${nextLesson?.slug}` : ''
        }
        prevLesson={
          previousLesson ? `/${course}/lesson?slug=${previousLesson?.slug}` : ''
        }
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

export default page;
