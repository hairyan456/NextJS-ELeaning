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
        <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
            <div>
                <div className="relative mb-5 aspect-video">
                    <iframe
                        className="w-full h-full object-cover"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <LessonNavigation
                        nextLesson={!nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`}
                        prevLesson={!prevLesson ? "" : `/${course}/lesson?slug=${prevLesson?.slug}`}
                    />
                    <div></div>
                </div>
            </div>

            <div>
                <div className='flex flex-col gap-5'>
                    {lectures.map((lecture: IUpdateCourseLecture) => (
                        <Accordion key={lecture._id} type="single" collapsible>
                            <AccordionItem value={lecture?._id?.toString()}>
                                <AccordionTrigger>
                                    <div className="flex font-bold items-center gap-3 justify-between w-full pr-5">
                                        {lecture.title}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className='!bg-transparent border-none p-0'>
                                    <div className="flex flex-col gap-3 mt-5">
                                        {lecture.lessons.map(lesson => (
                                            <LessonItem
                                                key={lesson._id}
                                                lesson={lesson}
                                                url={`/${course}/lesson?slug=${lesson.slug}`}
                                            />
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default page;