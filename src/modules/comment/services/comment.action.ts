'use server';
import { revalidatePath } from 'next/cache';

import User from '@/database/user.model';
import { connectToDatabase } from '@/shared/lib/mongoose';
import { ICommentItem, ICreateCommentParams } from '@/shared/types';

import CommentSchema from './comment.schema';

export async function getCommentsByLesson(
  lessonId: string,
  sort: 'recent' | 'oldest' = 'recent',
): Promise<ICommentItem[] | undefined> {
  try {
    connectToDatabase();
    const comments = await CommentSchema.find<ICommentItem>({
      lesson: lessonId,
      // status: ECommentStatus.APPROVED
    })
      .sort({ created_at: sort === 'recent' ? -1 : 1 })
      .populate({
        path: 'user',
        model: User,
        select: 'name avatar',
      });

    return comments ? JSON.parse(JSON.stringify(comments)) : [];
  } catch (error) {
    console.log('Error get comments by Lesson:', error);
  }
}

export async function createNewComment(
  params: ICreateCommentParams,
): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const newComment = await CommentSchema.create(params);

    revalidatePath(params?.path || '/');

    return newComment?._id ? true : false;
  } catch (error) {
    console.log('Error create new comment:', error);
  }
}
