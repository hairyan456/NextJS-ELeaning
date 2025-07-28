import PageNotFound from "@/app/not-found";
import { getCourseBySlug } from "@/lib/actions/course.action";
import { findAllLessons, getLessonBySlug } from "@/lib/actions/lesson.action";
import LessonNavigation from "./LessonNavigation";
import Heading from "@/components/typography/Heading";
import LessonContent from "@/components/lesson/LessonContent";
import { getHistory } from "@/lib/actions/history.action";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import { EUserRole } from "@/types/enums";
import LessonSaveUrl from "./LessonSaveUrl";

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

    // Kiểm tra user đã xác thực hay chưa
    const { userId } = await auth();
    if (!userId) return <PageNotFound />;
    const findUser = await getUserInfo({ userId: userId || "" });
    if (!findUser?._id) return <PageNotFound />;
    // Kiểm tra danh sách Courses của user có khóa học này hay không
    if (!findUser.courses?.includes(courseId as any)) {
        return <PageNotFound />;
    }
    // && findUser.role !== EUserRole.ADMIN

    const lessonDetail = await getLessonBySlug({ slug, course: courseId || "" });
    if (!lessonDetail?._id)
        return <PageNotFound />;
    const videoId = lessonDetail.video_url?.split('v=').at(-1);

    const listLessons = await findAllLessons({ course: courseId || "" });
    const currentLessonIndex = listLessons?.findIndex(l => l.slug === lessonDetail.slug) || 0;
    const nextLesson = listLessons?.[currentLessonIndex + 1];
    const prevLesson = listLessons?.[currentLessonIndex - 1];
    const lectures = findCourse?.lectures || [];
    const histories = await getHistory({ course: courseId || "" });
    const completePercentage = (histories?.length || 0) / (listLessons?.length || 1) * 100;

    return (
        <div className="block xl:grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start">
            <LessonSaveUrl
                url={`/${course}/lesson?slug=${slug}`}
                course={course}
            />
            <div>
                <div className="relative mb-5 aspect-video">
                    <iframe
                        className="w-full h-full object-cover"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    />
                </div>
                <div className="flex items-center justify-between mb-5">
                    <LessonNavigation
                        nextLesson={!nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`}
                        prevLesson={!prevLesson ? "" : `/${course}/lesson?slug=${prevLesson?.slug}`}
                    />
                    <div></div>
                </div>
                <Heading className="mb-10">{lessonDetail.title}</Heading>
                <div className="p-5 rounded-lg bgDarkMode borderDarkMode entry-content">
                    <div dangerouslySetInnerHTML={{ __html: lessonDetail?.content || "" }} />
                </div>
            </div>

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
        </div>
    );
};

export default page;