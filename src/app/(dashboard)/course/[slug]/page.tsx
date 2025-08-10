import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';

import PageNotFound from '@/app/not-found';
import LessonContent from '@/components/lesson/lesson-content';
import {
  getCourseBySlug,
  getCourseLessonsInfo,
  updateCourseView,
} from '@/lib/actions/course.action';
import { getUserInfo } from '@/lib/actions/user.actions';
import { IconCheck } from '@/shared/components/icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { courseLevelTitle } from '@/shared/constants';
import { ECourseStatus } from '@/types/enums';
import { formatMinutesToHour } from '@/utils';

import AlreadyEnroll from './already-enroll';
import CourseWidget from './course-widget';

const page = async ({ params }: { params: { slug: string } }) => {
  await updateCourseView({ slug: params.slug }); // tăng 1 lượt xem khóa học mỗi khi truy cập

  const data = await getCourseBySlug({ slug: params.slug });

  if (!data?._id) return null;
  if (data.status !== ECourseStatus.APPROVED) return <PageNotFound />;
  const videoId = data.intro_url?.split('v=')[1];
  const lectures = data.lectures || [];

  const { userId } = await auth();
  const findUser = await getUserInfo({ userId: userId || '' });
  const userCourses = findUser?.courses?.map((c) => c?.toString());
  const { duration, lessons }: any = await getCourseLessonsInfo({
    slug: data.slug,
  });

  const ratings = data.rating.map((r: any) => r?.content || '');

  return (
    <div className="grid min-h-screen gap-10 lg:grid-cols-[2fr,1fr]">
      {/* Left */}
      <div>
        <div className="relative mb-5 aspect-video">
          {data.intro_url ? (
            <>
              <iframe
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="size-full object-fill"
                height={514}
                referrerPolicy="strict-origin-when-cross-origin"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Kỹ thuật giúp Shopee giữ vững server trước lượng tải lớn"
                width={914}
              />
            </>
          ) : (
            <Image
              fill
              alt="Course Image"
              className="size-full rounded-lg object-cover"
              src={data.image}
            />
          )}
        </div>
        <div className="mb-5 flex flex-wrap gap-2">{}</div>
        <div className="mb-5 flex flex-wrap gap-2">
          {ratings.map((r, index) => (
            <div
              key={index}
              className="rounded-full bg-gradient-to-tr from-primary to-secondary p-2 px-4 text-sm font-medium text-white"
            >
              {r}
            </div>
          ))}
        </div>
        <h1 className="mb-5 text-3xl font-semibold">{data?.title}</h1>
        <BoxSection title="Mô tả">
          <div className="leading-normal tracking-wider">
            {data?.description}
          </div>
        </BoxSection>
        <BoxSection title="Thông tin khóa học">
          <div className="grid grid-cols-4 gap-5">
            <BoxInfo title="Bài học">{lessons}</BoxInfo>
            <BoxInfo title="Lượt xem">{data.views.toLocaleString()}</BoxInfo>
            <BoxInfo title="Trình độ">{courseLevelTitle[data.level]}</BoxInfo>
            <BoxInfo title="Thời lượng">
              {formatMinutesToHour(duration)}
            </BoxInfo>
          </div>
        </BoxSection>
        <BoxSection title="Nội dung khóa học">
          <LessonContent
            course=""
            lectures={lectures}
            slug=""
          />
        </BoxSection>
        <BoxSection title="Yêu cầu">
          <div className="leading-normal tracking-wider">
            {data.info?.requirements?.map((item, index) => (
              <div
                key={index}
                className="mb-3 flex items-center gap-2"
              >
                <span className="flex size-4 shrink-0 items-center justify-center rounded bg-primary text-white">
                  <IconCheck className="size-3 font-semibold" />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </BoxSection>
        <BoxSection title="Lợi ích">
          <div className="leading-normal tracking-wider">
            {data.info?.benefits?.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </BoxSection>
        <BoxSection title="Q.A">
          <div className="mb-10 leading-normal tracking-wider">
            {data.info?.qa?.map((item, index) => (
              <Accordion
                key={index}
                collapsible
                type="single"
              >
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
        {userCourses?.includes(data._id.toString()) ? (
          <AlreadyEnroll />
        ) : (
          <CourseWidget
            data={data}
            duration={formatMinutesToHour(duration)}
            findUser={findUser}
          />
        )}
      </div>
    </div>
  );
};

function BoxSection({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="mb-5 text-xl font-bold">{title}</h2>
      <div className="mb-10">{children}</div>
    </>
  );
}

function BoxInfo({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-white p-5">
      <h4 className="text-sm font-normal text-slate-400">{title}</h4>
      <h3 className="font-bold">{children}</h3>
    </div>
  );
}

export default page;
