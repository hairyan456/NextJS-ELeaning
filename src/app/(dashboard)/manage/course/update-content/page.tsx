import CourseUpdateContent from '@/components/course/CourseUpdateContent';
import { getCourseBySlug } from '@/lib/actions/course.action';
import { Heading } from '@/shared/components';

const page = async ({ searchParams }: { searchParams: { slug: string } }) => {
  const findCourse = await getCourseBySlug({ slug: searchParams.slug });

  if (!findCourse) return <>Không tìm thấy khóa học.</>;

  return (
    <>
      <Heading className="mb-10">
        Nội dung: <strong className="text-primary">{findCourse.title}</strong>
      </Heading>
      <CourseUpdateContent course={JSON.parse(JSON.stringify(findCourse))} />
    </>
  );
};

export default page;
