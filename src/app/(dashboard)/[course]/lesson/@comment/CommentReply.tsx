"use client";

import { ICommentItem } from "@/types";
import { formatDateVN } from "@/utils";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { MAX_COMMENT_LEVEL } from "@/shared/constants";

interface CommentReplyProps {
    comment: ICommentItem;
    lessonId: string;
    userId: string;
}

const CommentReply = ({ comment, lessonId, userId }: CommentReplyProps) => {
    const [showReply, setShowReply] = useState(false);
    return (
        <>
            <div className="flex items-center gap-5 text-sm text-gray-400 font-medium mb-3">
                <span>{formatDateVN(comment.created_at)}</span>
                {comment.level <= MAX_COMMENT_LEVEL &&
                    <>
                        <span className="rounded-full size-1 bg-gray-300" />
                        <button type="button" onClick={() => setShowReply(!showReply)}>Reply</button>
                    </>
                }
            </div>
            {showReply && (
                <CommentForm
                    comment={comment}
                    lessonId={lessonId}
                    userId={userId}
                    isReply
                    closeReply={() => setShowReply(false)}
                />
            )}
        </>
    );
};

export default CommentReply;