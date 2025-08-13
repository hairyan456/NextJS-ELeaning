import { CourseDetailPage } from '@/modules/course/pages';

interface ICourseDetailPageRootProps {
  params: { slug: string };
}
const CourseDetailPageRoot = ({ params }: ICourseDetailPageRootProps) => {
  return <CourseDetailPage slug={params.slug} />;
};

export default CourseDetailPageRoot;
