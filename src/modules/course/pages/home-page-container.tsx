import CourseItem from '@/components/course/course-item';
import { getAllCoursesPublic } from '@/lib/actions/course.action';
import { CourseGrid } from '@/shared/components';

const HomePageContainer = async () => {
  const courses = (await getAllCoursesPublic({})) || [];

  return (
    <div>
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

export default HomePageContainer;
