import { auth } from '@clerk/nextjs/server';
import { Suspense } from 'react';

import PageNotFound from '@/app/not-found';
import { getUserInfo } from '@/lib/actions/user.actions';

import LoadingPlayer from '../../../../modules/course/pages/course-lesson/components/course-lesson-player/loading-player';
import LessonWrapper from '../../../../modules/course/pages/course-lesson/components/lesson-wrapper';
import LoadingOutline from './@outline/loading-outline';

interface ILayoutProps {
  player: React.ReactNode;
  outline: React.ReactNode;
  comment: React.ReactNode;
}

const Layout = async ({ comment, outline, player }: ILayoutProps) => {
  // Authenticate user
  const { userId } = await auth();

  if (!userId) return <PageNotFound />;
  const findUser = await getUserInfo({ userId: userId || '' });

  if (!findUser?._id) return <PageNotFound />;

  return (
    <LessonWrapper>
      <Suspense fallback={<LoadingPlayer />}>
        <div>
          {player}
          {comment}
        </div>
      </Suspense>
      <Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
    </LessonWrapper>
  );
};

export default Layout;
