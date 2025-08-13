import { ICourseLessonPageRootProps } from '@/shared/types';

import { CourseLessonContainer } from './components';

interface ICourseLessonPageProps extends ICourseLessonPageRootProps {}
const CourseLessonPage = ({ params, searchParams }: ICourseLessonPageProps) => {
  return (
    <CourseLessonContainer
      params={params}
      searchParams={searchParams}
    />
  );
};

export default CourseLessonPage;
