import CourseItem from '@/components/course/course-item';
import { getAllCoursesPublic } from '@/lib/actions/course.action';
import { CourseGrid, Heading } from '@/shared/components';

const page = async () => {
  const courses = (await getAllCoursesPublic({})) || [];

  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses?.length > 0 &&
          courses.map((item) => (
            <CourseItem
              key={item.slug}
              data={item}
            />
          ))}
      </CourseGrid>
    </div>
  );
};

export default page;
