import { getUserCourses } from '@/lib/actions/user.actions';

import StudyCourses from './components/study-courses';

const StudyPageContainer = async () => {
  const courses = (await getUserCourses()) || [];

  return (
    <>
      <StudyCourses courses={courses} />
    </>
  );
};

export default StudyPageContainer;
