import { fetchCourses } from '../../actions';
import CourseDashboardContainer from './components';

const CourseDashboardPage = async () => {
  const courses = (await fetchCourses({})) || [];

  return <CourseDashboardContainer courses={courses} />;
};

export default CourseDashboardPage;
