import { getCourseBySlug } from '@/lib/actions/course.action'
import LessonSaveUrl from '../LessonSaveUrl'
import PageNotFound from '@/app/not-found'
import { findAllLessons } from '@/lib/actions/lesson.action'
import VideoPlay from './VideoPlay'
import { auth } from '@clerk/nextjs/server'
import { getUserInfo } from '@/lib/actions/user.actions'
import { Heading } from '@/shared/components'

const page = async ({
  params,
  searchParams,
}: {
  params: { course: string }
  searchParams: { slug: string }
}) => {
  const { userId } = await auth()
  const findUser = await getUserInfo({ userId: userId! })

  const course = params.course
  const slug = searchParams.slug
  const findCourse = await getCourseBySlug({ slug: course })
  if (!findCourse?._id) return <PageNotFound />
  const courseId = findCourse?._id.toString()
  const listLessons = await findAllLessons({ course: courseId || '' })
  const lessonDetail = listLessons?.find((l) => l.slug === slug)
  if (!lessonDetail?._id) return <PageNotFound />
  // const videoId = lessonDetail.video_url?.split('v=').at(-1);
  const currentLessonIndex = listLessons?.findIndex((l) => l.slug === slug) || 0
  const nextLesson = listLessons?.[currentLessonIndex + 1]
  const prevLesson = listLessons?.[currentLessonIndex - 1]

  return (
    <div className="mb-5">
      <LessonSaveUrl course={course} url={`/${course}/lesson?slug=${slug}`} />
      {/* <iframe
                        className="w-full h-full object-cover"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    /> */}
      <VideoPlay
        data={{
          userId: findUser?._id || '',
          courseId,
        }}
        nextLesson={
          !nextLesson ? '' : `/${course}/lesson?slug=${nextLesson?.slug}`
        }
        prevLesson={
          !prevLesson ? '' : `/${course}/lesson?slug=${prevLesson?.slug}`
        }
      />
      <Heading className="mb-10">{lessonDetail.title}</Heading>
      <div className="p-5 rounded-lg bgDarkMode borderDarkMode entry-content">
        <div
          dangerouslySetInnerHTML={{ __html: lessonDetail?.content || '' }}
        />
      </div>
    </div>
  )
}

export default page
