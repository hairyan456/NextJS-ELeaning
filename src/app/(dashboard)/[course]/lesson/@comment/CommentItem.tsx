'use client'

import Image from 'next/image'
import CommentReply from './CommentReply'
import { ICommentItem } from '@/types'
import { getRepliesComment, timeAgo } from '@/utils'
import { cn } from '@/lib/utils'
import { ECommentStatus } from '@/shared/types/enum'

const CommentItem = ({
  comment,
  lessonId,
  userId,
  comments = [],
}: {
  comment: ICommentItem
  lessonId: string
  userId: string
  comments: ICommentItem[]
}) => {
  if (!comment?._id) return null
  const replies = getRepliesComment(comments, comment?._id)
  const level = comment.level || 0
  const isPending = comment.status === ECommentStatus.PENDING

  return (
    <>
      <div
        className={cn(
          'flex items-start gap-3 p-3 rounded-xl bgDarkMode border dark:border-opacity-50 ml-auto',
          {
            'opacity-50 pointer-events-none': isPending,
            'mt-5 first:mt-0': level === 0,
          },
        )}
        style={{
          width: `calc(100% - ${level * 65}px)`, // set width của các reply level càng ngắn dần
        }}
      >
        <div className="size-10 border rounded-full borderDarkMode shadow-sm flex-shrink-0">
          <Image
            alt="avatar user"
            className="rounded-full"
            height={50}
            src={comment.user.avatar || ''}
            width={50}
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center gap-3">
            <h4 className="font-bold">{comment.user.name}</h4>
            <span className="text-xs text-gray-400 font-medium">
              {timeAgo(comment.created_at.toString())}
            </span>
          </div>
          <p className="mb-3 text-sm leading-relaxed text-gray-900 dark:text-white">
            {comment.content}
          </p>
          {!isPending && (
            <CommentReply
              comment={comment}
              lessonId={lessonId}
              userId={userId}
            />
          )}
        </div>
      </div>

      {replies?.length > 0 &&
        replies?.map((item) => (
          <CommentItem
            key={item?._id}
            comment={item}
            comments={comments}
            lessonId={lessonId}
            userId={userId}
          />
        ))}
    </>
  )
}

export default CommentItem
