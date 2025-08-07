import PageNotFound from '@/app/not-found';
import { IconCheck } from '@/shared/components/icons';
import { getCourseBySlug, getCourseLessonsInfo, updateCourseView } from '@/lib/actions/course.action';
import { ECourseStatus } from '@/types/enums';
import Image from 'next/image';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/shared/components/ui/accordion";
import LessonContent from '@/components/lesson/LessonContent';
import { auth } from '@clerk/nextjs/server';
import { getUserInfo } from '@/lib/actions/user.actions';
import CourseWidget from './CourseWidget';
import AlreadyEnroll from './AlreadyEnroll';
import { formatMinutesToHour } from '@/utils';
import { courseLevelTitle } from '@/shared/constants';

const page = async ({ params }: { params: { slug: string } }) => {
    await updateCourseView({ slug: params.slug }); // tăng 1 lượt xem khóa học mỗi khi truy cập

    const data = await getCourseBySlug({ slug: params.slug });
    if (!data?._id)
        return null;
    if (data.status !== ECourseStatus.APPROVED)
        return <PageNotFound />
    const videoId = data.intro_url?.split('v=')[1];
    const lectures = data.lectures || [];

    const { userId } = await auth();
    const findUser = await getUserInfo({ userId: userId || "" });
    const userCourses = findUser?.courses?.map(c => c?.toString());
    const { duration, lessons }: any = await getCourseLessonsInfo({
        slug: data.slug,
    });

    const ratings = data.rating.map((r: any) => r?.content || '');
    return (
        <div className='grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen'>
            {/* Left */}
            <div>
                <div className="relative aspect-video mb-5">
                    {data.intro_url ?
                        <>
                            <iframe
                                width={914}
                                height={514}
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title="Kỹ thuật giúp Shopee giữ vững server trước lượng tải lớn"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className='w-full h-full object-fill'
                            />
                        </>
                        :
                        <Image
                            src={data.image}
                            alt='Course Image'
                            fill
                            className='w-full h-full object-cover rounded-lg'
                        />
                    }
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                    { }
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                    {ratings.map((r, index) => (
                        <div
                            className='p-2 px-4 text-sm font-medium rounded-full text-white bg-gradient-to-tr from-primary to-secondary'
                            key={index}>
                            {r}
                        </div>
                    ))}
                </div>
                <h1 className='font-semibold text-3xl mb-5'>{data?.title}</h1>
                <BoxSection title='Mô tả'>
                    <div className='leading-normal tracking-wider'>
                        {data?.description}
                    </div>
                </BoxSection>
                <BoxSection title='Thông tin khóa học'>
                    <div className='grid grid-cols-4 gap-5'>
                        <BoxInfo title='Bài học'>
                            {lessons}
                        </BoxInfo>
                        <BoxInfo title='Lượt xem'>
                            {data.views.toLocaleString()}
                        </BoxInfo>
                        <BoxInfo title='Trình độ'>
                            {courseLevelTitle[data.level]}
                        </BoxInfo>
                        <BoxInfo title='Thời lượng'>
                            {formatMinutesToHour(duration)}
                        </BoxInfo>
                    </div>
                </BoxSection>
                <BoxSection title='Nội dung khóa học'>
                    <LessonContent
                        lectures={lectures}
                        course=''
                        slug=''
                    />

                </BoxSection>
                <BoxSection title='Yêu cầu'>
                    <div className='leading-normal tracking-wider'>
                        {data.info?.requirements?.map((item, index) => (
                            <div key={index} className='mb-3 flex items-center gap-2'>
                                <span className='flex-shrink-0 size-4 bg-primary text-white rounded flex items-center
                                 justify-center'>
                                    <IconCheck className='size-3 font-semibold' />
                                </span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </BoxSection>
                <BoxSection title='Lợi ích'>
                    <div className='leading-normal tracking-wider'>
                        {data.info?.benefits?.map((item, index) => (
                            <div key={index}>
                                {item}
                            </div>
                        ))}
                    </div>
                </BoxSection>
                <BoxSection title='Q.A'>
                    <div className='leading-normal tracking-wider mb-10'>
                        {data.info?.qa?.map((item, index) => (
                            <Accordion key={index} type="single" collapsible>
                                <AccordionItem value={item.question}>
                                    <AccordionTrigger>{item.question}</AccordionTrigger>
                                    <AccordionContent>{item.answer}</AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))}
                    </div>
                </BoxSection>
            </div>

            {/* Right */}
            <div>
                {userCourses?.includes(data._id.toString()) ? <AlreadyEnroll />
                    :
                    <CourseWidget
                        duration={formatMinutesToHour(duration)}
                        findUser={findUser}
                        data={data}
                    />
                }
            </div>

        </div>
    );
};

function BoxSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <>
            <h2 className='font-bold text-xl mb-5'>{title}</h2>
            <div className='mb-10'>{children}</div>
        </>
    )
}

function BoxInfo({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className='bg-white rounded-lg p-5'>
            <h4 className='text-sm text-slate-400 font-normal'>{title}</h4>
            <h3 className='font-bold'>{children}</h3>
        </div>
    )
}

export default page;