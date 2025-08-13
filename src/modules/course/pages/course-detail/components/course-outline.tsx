import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { IHistoryItemData, ILectureItemData } from '@/shared/types';

import CourseLessonItem from './course-lesson-item';

interface ICourseOutlineProps {
  lectures: ILectureItemData[];
  course: string;
  slug: string;
  histories?: IHistoryItemData[];
}

const CourseOutline = ({
  course,
  histories = [],
  lectures,
  slug,
}: ICourseOutlineProps) => {
  return (
    <div className="flex flex-col gap-5">
      {lectures.map((lecture) => (
        <Accordion
          key={lecture._id}
          collapsible
          type="single"
        >
          <AccordionItem value={lecture?._id?.toString()}>
            <AccordionTrigger>
              <div className="flex w-full items-center justify-between gap-3 pr-5 font-bold">
                <div className="line-clamp-1">{lecture.title}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-none !bg-transparent p-0">
              <div className="mt-5 flex flex-col gap-3">
                {lecture.lessons.map((item) => {
                  return (
                    <CourseLessonItem
                      key={item._id}
                      course={course}
                      histories={histories}
                      lesson={item}
                      slug={slug}
                    />
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default CourseOutline;
