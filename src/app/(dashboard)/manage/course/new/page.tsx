import { auth } from '@clerk/nextjs/server';

import CourseAddNewForm from '@/components/course/CourseAddNewForm';
import { getUserInfo } from '@/lib/actions/user.actions';
import { Heading } from '@/shared/components';

const page = async () => {
  const { userId } = await auth();

  if (!userId) return null;
  const mongoUser = await getUserInfo({ userId });

  if (!mongoUser) return null;

  return (
    <div>
      <Heading>Tạo khóa học mới</Heading>
      <CourseAddNewForm user={JSON.parse(JSON.stringify(mongoUser))} />
    </div>
  );
};

export default page;
