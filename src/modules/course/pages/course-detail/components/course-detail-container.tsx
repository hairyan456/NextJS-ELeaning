import Image from 'next/image';

import PageNotFound from '@/app/not-found';
import { getCourseLessonsInfo } from '@/lib/actions/course.action';
import { ICourseItemData } from '@/modules/course/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { courseLevelTitle } from '@/shared/constants';
import { ICourseLessonData } from '@/shared/types/course.type';
import { ECourseStatus } from '@/shared/types/enums';
import { formatMinutesToHour } from '@/utils';

import CourseOutline from './course-outline';
import CourseWidget from './course-widget';
import RatingItem from './rating-item';
import RequirementItem from './requirement-item';
import SectionInfo from './section-info';
import SectionItem from './section-item';

interface ICourseDetailContainerProps {
  userId?: string | null;
  courseDetail: ICourseItemData | undefined;
}

const CourseDetailContainer = async ({
  courseDetail,
}: ICourseDetailContainerProps) => {
  const isEmptyData =
    !courseDetail || courseDetail.status !== ECourseStatus.APPROVED;

  if (isEmptyData) return <PageNotFound />;
  const videoId = courseDetail.intro_url?.split('v=')[1];
  const ratings = courseDetail.rating.map((r) => r?.content || '');
  const lessonInfo: ICourseLessonData = (await getCourseLessonsInfo({
    slug: courseDetail.slug,
  })) || { duration: 0, lessons: 0 };
  const requirements = courseDetail.info.requirements || [];
  const benefits = courseDetail.info.benefits || [];
  const questionAnswers = courseDetail.info.qa || [];

  return (
    <div className="grid min-h-screen items-start gap-10 lg:grid-cols-[2fr,1fr]">
      {/* Left */}
      <div>
        <div className="relative mb-5 aspect-video">
          {courseDetail.intro_url ? (
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
              src={courseDetail.image}
            />
          )}
        </div>
        <div className="mb-5 flex flex-wrap gap-2">{}</div>
        <div className="mb-5 flex flex-wrap gap-2">
          {ratings.map((r: string, index) => (
            <RatingItem
              key={index}
              rating={r}
            />
          ))}
        </div>
        <h1 className="mb-5 text-3xl font-semibold">{courseDetail?.title}</h1>
        <SectionItem title="Mô tả">
          <div className="leading-normal tracking-wider">
            {courseDetail?.description}
          </div>
        </SectionItem>
        <SectionItem title="Thông tin khóa học">
          <div className="grid grid-cols-4 gap-5">
            <SectionInfo title="Bài học">{lessonInfo.lessons}</SectionInfo>
            <SectionInfo title="Lượt xem">
              {courseDetail.views.toLocaleString()}
            </SectionInfo>
            <SectionInfo title="Trình độ">
              {courseLevelTitle[courseDetail.level]}
            </SectionInfo>
            <SectionInfo title="Thời lượng">
              {formatMinutesToHour(lessonInfo.duration)}
            </SectionInfo>
          </div>
        </SectionItem>
        <SectionItem title="Nội dung khóa học">
          <CourseOutline
            course=""
            lectures={courseDetail.lectures}
            slug=""
          />
        </SectionItem>
        <SectionItem title="Yêu cầu">
          <div className="leading-normal tracking-wider">
            {requirements?.map((item, index) => (
              <RequirementItem
                key={index}
                title={item}
              />
            ))}
          </div>
        </SectionItem>
        <SectionItem title="Lợi ích">
          <div className="leading-normal tracking-wider">
            {benefits?.map((item, index) => (
              <div key={index}>- {item}</div>
            ))}
          </div>
        </SectionItem>
        <SectionItem title="Q.A">
          <div className="mb-20 leading-normal tracking-wider">
            <div className="flex flex-col gap-3">
              {questionAnswers.map((item, index) => (
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
          </div>
        </SectionItem>
      </div>

      {/* Right */}
      <CourseWidget
        data={courseDetail}
        duration={formatMinutesToHour(lessonInfo.duration)}
      />
    </div>
  );
};

export default CourseDetailContainer;
