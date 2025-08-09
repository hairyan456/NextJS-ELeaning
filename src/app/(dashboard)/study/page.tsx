import { getUserCourses } from '@/lib/actions/user.actions';
import { Heading } from '@/shared/components';

import StudyCourses from './StudyCourses';

const page = async () => {
  const courses = await getUserCourses();

  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <StudyCourses
        courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
      />
    </>
  );
};

export default page;
