import { IUpdateCourseLecture } from '@/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion'
import LessonItem from './LessonItem'
import { IHistory } from '@/database/history.model'

const LessonContent = ({
  lectures,
  course,
  slug,
  histories = [],
}: {
  lectures: IUpdateCourseLecture[]
  course: string
  slug: string
  histories?: IHistory[]
}) => {
  return (
    <div className="flex flex-col gap-5">
      {lectures.map((lecture: IUpdateCourseLecture) => (
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
                {lecture.lessons.map((lesson) => (
                  <LessonItem
                    key={lesson._id}
                    isActive={!slug ? false : lesson.slug === slug}
                    lesson={lesson ? JSON.parse(JSON.stringify(lesson)) : {}}
                    url={!course ? '' : `/${course}/lesson?slug=${lesson.slug}`}
                    isChecked={
                      histories.some(
                        (el) => el.lesson.toString() === lesson._id.toString(),
                      ) || false
                    }
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}

export default LessonContent
