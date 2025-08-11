import { CourseManagePageContainer } from '@/modules/course/pages';
import { ECourseStatus } from '@/shared/types/enums';

export interface ICourseManagePageRootProps {
  searchParams: { page: number; search: string; status: ECourseStatus };
}

const CourseManagePageRoot = ({ searchParams }: ICourseManagePageRootProps) => {
  return (
    <>
      <CourseManagePageContainer searchParams={searchParams} />
    </>
  );
};

export default CourseManagePageRoot;
