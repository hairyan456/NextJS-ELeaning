'use client';

import Image from "next/image";
import CommentReply from "./CommentReply";
import { ICommentItem } from "@/types";
import { getRepliesComment, timeAgo } from "@/utils";
import { cn } from "@/lib/utils";

const CommentItem = ({ comment, lessonId, userId, comments = [] }: {
    comment: ICommentItem;
    lessonId: string;
    userId: string;
    comments: ICommentItem[];
}) => {
    if (!comment?._id) return null;
    const replies = getRepliesComment(comments, comment?._id);
    const level = comment.level || 0;
    const commentBorderClassNames: { [key: string]: string } = {
        "0": "border-gray-200 dark:border-transparent",
        "1": "border-blue-200",
        "2": "border-green-200",
        "3": "border-yellow-200",
        "4": "border-red-200",
    }

    return (
        <>
            <div className={cn("flex items-start gap-3 p-3 rounded-xl bgDarkMode border ml-auto",
                commentBorderClassNames[level.toString()]
            )}
                style={{
                    width: `calc(100% - ${level * 65}px)` // set width của các reply level càng ngắn dần
                }}
            >
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
                        lessonId={lessonId}
                        userId={userId}
                        comment={comment}
                                            />
                </div>
            </div>

            {replies?.length > 0 && replies?.map(item => (
                <CommentItem
                    key={item?._id}
                    comment={item}
                    lessonId={lessonId}
                    userId={userId}
                    comments={comments}
                />
            ))}
        </>

    );
};

export default CommentItem;