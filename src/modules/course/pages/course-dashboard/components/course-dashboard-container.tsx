import CourseItem from '@/modules/course/components/course-item';
import { ICourse } from '@/modules/course/models';
import { CourseGrid } from '@/shared/components';

interface ICourseDashboardContainerProps {
  courses: ICourse[];
}

const CourseDashboardContainer = ({
  courses,
}: ICourseDashboardContainerProps) => {
  if (!courses || courses.length <= 0) return null;

  return (
    <>
      <CourseGrid>
        {courses?.length > 0 &&
          courses.map((item) => (
            <CourseItem
              key={item.slug}
              data={item}
            />
          ))}
      </CourseGrid>
    </>
  );
};

export default CourseDashboardContainer;
