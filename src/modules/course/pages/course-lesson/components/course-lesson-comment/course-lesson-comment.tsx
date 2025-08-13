import PageNotFound from '@/app/not-found';
import { getLessonBySlug } from '@/lib/actions/lesson.action';
import { getCommentsByLesson } from '@/modules/comment/services/comment.action';

import CommentForm from './comment-form';
import CommentItem from './comment-item';
import CommentSorting from './comment-sorting';

interface ICourseLessonCommentProps {
  courseId: string;
  lessonSlug: string;
  sort: 'recent' | 'oldest';
}
const CourseLessonComment = async ({
  courseId,
  lessonSlug,
  sort,
}: ICourseLessonCommentProps) => {
  // COMMENT
  const lesson = await getLessonBySlug({
    slug: lessonSlug,
    course: courseId,
  });
  const lessonId = lesson?._id.toString();

  if (!lessonId) return <PageNotFound />;

  const comments = await getCommentsByLesson(lessonId || '', sort);

  const rootComments = comments?.filter(
    (item) => !item.parentId || item.parentId === null,
  ); // comment level 0
  const commentLessonId = lesson?._id?.toString() || '';
  //   const commentUserId = findUser?._id?.toString();

  return (
    <div>
      <CommentForm lessonId={commentLessonId} />
      {!!rootComments && rootComments?.length > 0 && (
        <div className="mt-10 flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <span>Comments</span>
              <span className="flex items-center justify-center rounded-full bg-primary px-4 py-0.5 text-sm font-semibold text-white">
                {comments?.length}
              </span>
            </h2>
            <CommentSorting />
          </div>
          <div className="flex flex-col gap-5">
            {rootComments.map((item) => (
              <CommentItem
                key={item?._id}
                comment={item}
                comments={comments || []}
                lessonId={commentLessonId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseLessonComment;
