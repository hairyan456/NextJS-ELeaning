import { fetchCoursesOfUser } from '../../actions';
import StudyPageContainer from './components';

const StudyPage = async () => {
  const courses = (await fetchCoursesOfUser()) || [];

  return (
    <>
      <StudyPageContainer courses={courses} />
    </>
  );
};

export default StudyPage;
