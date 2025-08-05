import { getCourseBySlug } from '@/lib/actions/course.action';
import CommentForm from './CommentForm';
import { getLessonBySlug } from '@/lib/actions/lesson.action';
import PageNotFound from '@/app/not-found';
import { auth } from '@clerk/nextjs/server';
import { getUserInfo } from '@/lib/actions/user.actions';
import { getCommentsByLesson } from '@/lib/actions/comment.action';
import { ICommentItem } from '@/types';
import { timeAgo } from '@/utils';
import Image from 'next/image';
import CommentReply from './CommentReply';

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
    const renderCommentItem = (comment: ICommentItem) => {
        return (
            <div key={comment._id} className='flex items-start gap-3 p-3 rounded-xl bgDarkMode shadow-sm border borderDarkMode'>
                <div className="size-10 border rounded-full borderDarkMode shadow-sm flex-shrink-0">
                    <Image
                        alt='avatar user'
                        src={comment.user.avatar || ""}
                        width={50} height={50}
                        className='rounded-full'
                    />
                </div>

                <div className='flex flex-col gap-1 w-full'>
                    <div className='flex items-center gap-3'>
                        <h4 className='font-bold'>{comment.user.name}</h4>
                        <span className='text-sm text-gray-400 font-medium'>{timeAgo(comment.created_at.toString())}</span>
                    </div>
                    <p className='mb-3 text-sm leading-relaxed text-gray-900 dark:text-white'>{comment.content}</p>
                    <CommentReply
                        lessonId={lesson?._id.toString() || ""}
                        userId={findUser?._id.toString() || ""}
                        comment={comment}
                    />
                </div>
            </div>
        )
    };

    return (
        <div>
            <CommentForm
                lessonId={lesson?._id?.toString()}
                userId={findUser?._id?.toString()}
            />
            {comments && comments?.length > 0 &&
                <div className='flex flex-col gap-10 mt-10'>
                    <h2 className='text-xl font-bold'>Comments</h2>
                    <div className="flex flex-col gap-5">
                        {comments.map(renderCommentItem)}
                    </div>
                </div>
            }
        </div>
    );
};

export default page;