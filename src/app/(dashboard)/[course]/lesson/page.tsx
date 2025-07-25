import PageNotFound from "@/app/not-found";
import { getCourseBySlug } from "@/lib/actions/course.action";
import { findAllLessons, getLessonBySlug } from "@/lib/actions/lesson.action";
import LessonNavigation from "./LessonNavigation";
import { IUpdateCourseLecture } from "@/types";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import LessonItem from "@/components/lesson/LessonItem";
import Heading from "@/components/typography/Heading";
import LessonContent from "@/components/lesson/LessonContent";

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
    const lessonDetail = await getLessonBySlug({ slug, course: courseId || "" });
    if (!lessonDetail?._id)
        return <PageNotFound />;
    const videoId = lessonDetail.video_url?.split('v=').at(-1);

    const listLessons = await findAllLessons({ course: courseId || "" });
    const currentLessonIndex = listLessons?.findIndex(l => l.slug === lessonDetail.slug) || 0;
    const nextLesson = listLessons?.[currentLessonIndex + 1];
    const prevLesson = listLessons?.[currentLessonIndex - 1];
    const lectures = findCourse?.lectures || [];

    return (
        <div className="grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start">
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
                <LessonContent lectures={lectures} course={course} slug={slug} />
            </div>
        </div>
    );
};

export default page;