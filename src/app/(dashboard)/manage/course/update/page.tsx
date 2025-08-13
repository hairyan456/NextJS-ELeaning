import CourseUpdateForm from '@/components/course/course-update-form';
import { fetchCourseBySlug } from '@/modules/course/actions';
import { Heading } from '@/shared/components';

const page = async ({ searchParams }: { searchParams: { slug: string } }) => {
  const findCourse = await fetchCourseBySlug({ slug: searchParams.slug });

  if (!findCourse) return <></>;

  return (
    <>
      <Heading className="mb-8">Cập nhật khóa học</Heading>
      {/* Form CourseUpdate */}
      <CourseUpdateForm
        data={JSON.parse(JSON.stringify(findCourse))} // Chuyển đổi đối tượng Mongoose sang JSON
      />
    </>
  );
};

export default page;
