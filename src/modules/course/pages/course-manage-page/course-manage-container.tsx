import { ICourseManagePageRootProps } from '@/app/(dashboard)/manage/course/page';
import { getAllCourses } from '@/lib/actions/course.action';

import CourseManage from './components/course-manage';

interface CourseManagePageContainerProps extends ICourseManagePageRootProps {}

const CourseManagePageContainer = async ({
  searchParams,
}: CourseManagePageContainerProps) => {
  const courses =
    (await getAllCourses({
      page: searchParams.page || 1,
      limit: 10,
      search: searchParams.search,
      status: searchParams.status,
    })) || [];

  return (
    <>
      <CourseManage courses={courses} />
    </>
  );
};

export default CourseManagePageContainer;
