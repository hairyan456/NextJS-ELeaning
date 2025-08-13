'use client';

import PageNotFound from '@/app/not-found';
import { useUserContext } from '@/shared/contexts';
import useGlobalStore from '@/store';

const LessonWrapper = ({
  children,
  courseId,
}: {
  children: React.ReactNode;
  courseId: string;
}) => {
  const { isExpandedPlayer } = useGlobalStore();
  const { userInfo } = useUserContext();

  if (!userInfo?._id) return <PageNotFound />;
  const userCourses = userInfo?.courses
    ? JSON.parse(JSON.stringify(userInfo.courses))
    : [];

  if (!userCourses?.includes(courseId)) return <PageNotFound />;

  return (
    <div
      className="block min-h-screen items-start gap-10 xl:grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)]"
      style={{
        display: isExpandedPlayer ? 'block' : 'grid',
      }}
    >
      {children}
    </div>
  );
};

export default LessonWrapper;
