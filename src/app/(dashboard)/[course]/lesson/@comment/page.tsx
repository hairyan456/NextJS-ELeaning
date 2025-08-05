import { getCourseBySlug } from '@/lib/actions/course.action';
import CommentForm from './CommentForm';
import { getLessonBySlug } from '@/lib/actions/lesson.action';
import PageNotFound from '@/app/not-found';
import { auth } from '@clerk/nextjs/server';
import { getUserInfo } from '@/lib/actions/user.actions';
import { getCommentsByLesson } from '@/lib/actions/comment.action';
import CommentItem from './CommentItem';

const page = async ({ params, searchParams }: {
    params: { course: string };
    searchParams: { slug: string; };
}) => {
    const { userId } = await auth();
    if (!userId) return <PageNotFound />;
    const findUser = await getUserInfo({ userId: userId || "" });
    if (!findUser?._id) return <PageNotFound />;

    const course = params.course;
    const slug = searchParams.slug;
    const findCourse = await getCourseBySlug({ slug: course });
    if (!findCourse) return <PageNotFound />;
    const lesson = await getLessonBySlug({ slug, course: findCourse?._id?.toString() });
    if (!lesson?._id) return <PageNotFound />;

    const comments = await getCommentsByLesson(lesson?._id?.toString() || "");
    const rootComments = comments?.filter((item) => !item.parentId || item.parentId === null) // comment level 0
    const commentLessonId = lesson?._id?.toString();
    const commentUserId = findUser?._id?.toString();

    return (
        <div>
            <CommentForm
                lessonId={commentLessonId}
                userId={commentUserId}
            />
            {rootComments && rootComments?.length > 0 &&
                <div className='flex flex-col gap-10 mt-10'>
                    <h2 className='text-xl font-bold'>Comments</h2>
                    <div className="flex flex-col gap-5">
                        {rootComments.map(item => (
                            <CommentItem
                                key={item?._id}
                                comment={item}
                                lessonId={commentLessonId}
                                userId={commentUserId}
                                comments={comments || []}
                            />
                        ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default page;