import { getCourseBySlug } from "@/lib/actions/course.action";
import LessonSaveUrl from "../LessonSaveUrl";
import PageNotFound from "@/app/not-found";
import { findAllLessons } from "@/lib/actions/lesson.action";
import LessonNavigation from "../LessonNavigation";
import Heading from "@/components/typography/Heading";

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
    const listLessons = await findAllLessons({ course: courseId || "" });
    const lessonDetail = listLessons?.find(l => l.slug === slug);
    if (!lessonDetail?._id)
        return <PageNotFound />;
    const videoId = lessonDetail.video_url?.split('v=').at(-1);
    const currentLessonIndex = listLessons?.findIndex(l => l.slug === slug) || 0;
    const nextLesson = listLessons?.[currentLessonIndex + 1];
    const prevLesson = listLessons?.[currentLessonIndex - 1];

    return (
        <>
            <LessonSaveUrl
                url={`/${course}/lesson?slug=${slug}`}
                course={course}
            />
            <div className="mb-5">
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

        </>
    );
};

export default page;