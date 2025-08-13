import { CourseLessonPage } from '@/modules/course/pages';
import { ICourseLessonPageRootProps } from '@/shared/types';

const CourseLessonPageRoot = ({
  params,
  searchParams,
}: ICourseLessonPageRootProps) => {
  return (
    <CourseLessonPage
      params={params}
      searchParams={searchParams}
    />
  );
};

export default CourseLessonPageRoot;
