import PageNotFound from "@/app/not-found";
import LessonContent from "@/components/lesson/LessonContent";
import { getCourseBySlug } from "@/lib/actions/course.action";
import { getHistory } from "@/lib/actions/history.action";
import { countLessonsByCourseId } from "@/lib/actions/lesson.action";

const page = async ({ params, searchParams }: {
    params: { course: string };
    searchParams: { slug: string; };
}) => {
    const course = params.course;
    const slug = searchParams.slug;
    const findCourse = await getCourseBySlug({ slug: course });
    if (!findCourse?._id)
        return <PageNotFound />;
    const courseId = findCourse?._id.toString();
    const lectures = findCourse?.lectures || [];
    const histories = await getHistory({ course: courseId || "" });
    const lessonsCount = await countLessonsByCourseId({ courseId });
    const completePercentage = (histories?.length || 0) / (lessonsCount || 1) * 100;

    return (
        <div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
            <div className="h-3 w-full rounded-full border borderDarkMode bgDarkMode mb-2">
                {/* progress bar */}
                <div className="w-0 h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-in-out"
                    style={{
                        width: `${completePercentage}%`,
                    }}
                />
            </div>
            <LessonContent
                lectures={lectures}
                course={course}
                slug={slug}
                histories={histories ? JSON.parse(JSON.stringify(histories)) : []}
            />
        </div>
    );
};

export default page;