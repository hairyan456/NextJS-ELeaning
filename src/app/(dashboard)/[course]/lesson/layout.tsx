import { auth } from '@clerk/nextjs/server';
import { Suspense } from 'react';

import PageNotFound from '@/app/not-found';
import { getUserInfo } from '@/lib/actions/user.actions';

import LoadingOutline from './@outline/LoadingOutline';
import LoadingPlayer from './@player/LoadingPlayer';
import LessonWrapper from './lesson-wrapper';

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
