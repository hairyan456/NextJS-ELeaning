import { auth } from '@clerk/nextjs/server';

import { fetchCourseBySlug } from '../../actions';
import CourseDetailContainer from './components';

interface ICourseDetailPageProps {
  slug: string;
}
const CourseDetailPage = async ({ slug }: ICourseDetailPageProps) => {
  const courseDetail = await fetchCourseBySlug({ slug });
  const { userId } = await auth();

  return (
    <CourseDetailContainer
      courseDetail={courseDetail}
      userId={userId}
    />
  );
};

export default CourseDetailPage;
