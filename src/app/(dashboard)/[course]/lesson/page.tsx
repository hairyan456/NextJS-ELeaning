import PageNotFound from "@/app/not-found";
import { IconArrowLeft, IconArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/lib/actions/course.action";
import { getLessonBySlug } from "@/lib/actions/lesson.action";

const page = async ({ params, searchParams }: {
    params: { course: string };
    searchParams: { slug: string; };
}) => {
    const course = params.course;
    const slug = searchParams.slug;
    const findCourse = await getCourseBySlug({ slug: course });
    if (!findCourse?._id)
        return <PageNotFound />;
    const lessonDetail = await getLessonBySlug({ slug, course: findCourse?._id?.toString() || "" });
    if (!lessonDetail?._id)
        return <PageNotFound />;
    const videoId = lessonDetail.video_url?.split('v=').at(-1);

    return (
        <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
            <div>
                <div className="relative mb-5 aspect-video">
                    <iframe
                        className="w-full h-full object-fill"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                        <Button className="size-10 p-3 text-white">
                            <IconArrowLeft />
                        </Button>
                        <Button className="size-10 p-3 text-white">
                            <IconArrowRight />
                        </Button>
                    </div>
                    <div></div>
                </div>
            </div>
            <div>b</div>
        </div>
    );
};

export default page;