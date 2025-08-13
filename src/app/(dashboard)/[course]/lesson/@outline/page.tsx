import PageNotFound from '@/app/not-found';
import { getHistory } from '@/lib/actions/history.action';
import { countLessonsByCourseId } from '@/lib/actions/lesson.action';
import { fetchCourseBySlug } from '@/modules/course/actions';
import LessonContent from '@/modules/course/pages/course-detail/components/course-outline';

const page = async ({
  params,
  searchParams,
}: {
  params: { course: string };
  searchParams: { slug: string };
}) => {
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await fetchCourseBySlug({ slug: course });

  if (!findCourse?._id) return <PageNotFound />;
  const courseId = findCourse?._id.toString();
  const lectures = findCourse?.lectures || [];
  const histories = await getHistory({ course: courseId || '' });
  const lessonsCount = await countLessonsByCourseId({ courseId });
  const completePercentage =
    ((histories?.length || 0) / (lessonsCount || 1)) * 100;

  return (
    <div className="sticky right-0 top-5 max-h-[calc(100svh-100px)] overflow-y-auto">
      <div className="borderDarkMode bgDarkMode mb-2 h-3 w-full rounded-full border">
        {/* progress bar */}
        <div
          className="h-full w-0 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-in-out"
          style={{
            width: `${completePercentage}%`,
          }}
        />
      </div>
      <LessonContent
        course={course}
        histories={histories ? JSON.parse(JSON.stringify(histories)) : []}
        lectures={lectures}
        slug={slug}
      />
    </div>
  );
};

export default page;
