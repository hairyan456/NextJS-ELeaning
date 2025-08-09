'use client'

import { ICommentItem } from '@/types'
import { formatDateVN } from '@/utils'
import { useState } from 'react'
import CommentForm from './CommentForm'
import { MAX_COMMENT_LEVEL } from '@/shared/constants'

interface CommentReplyProps {
  comment: ICommentItem;
  lessonId: string;
  userId: string;
}

const CommentReply = ({ comment, lessonId, userId }: CommentReplyProps) => {
  const [isShowReply, setIsShowReply] = useState<boolean>(false)
  return (
    <>
      <div className="mb-3 flex items-center gap-5 text-sm font-medium text-gray-400">
        <span>{formatDateVN(comment.created_at)}</span>
        {comment.level <= MAX_COMMENT_LEVEL && (
          <>
            <span className="size-1 rounded-full bg-gray-300" />
            <button
              className=""
              type="button"
              onClick={() => setIsShowReply(!isShowReply)}
            >
              Reply
            </button>
          </>
        )}
      </div>
      {isShowReply && (
        <CommentForm
          isReply
          closeReply={() => setIsShowReply(false)}
          comment={comment}
          lessonId={lessonId}
          userId={userId}
        />
      )}
    </>
  )
}

export default CommentReply
