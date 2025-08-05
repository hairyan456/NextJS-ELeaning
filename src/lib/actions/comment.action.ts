'use server';

import Comment from "@/database/comment.model";
import { connectToDatabase } from "../mongoose";
import { ICommentItem, ICreateCommentParams } from "@/types";
import { ECommentStatus } from "@/types/enums";
import User from "@/database/user.model";

export async function getCommentsByLesson(lessonId: string): Promise<ICommentItem[] | undefined> {
    try {
        connectToDatabase();
        const comments = await Comment.find<ICommentItem>({
            lesson: lessonId,
            status: ECommentStatus.APPROVED
        })
            .populate({
                path: "user",
                model: User,
                select: "name avatar"
            });
        return comments ? JSON.parse(JSON.stringify(comments)) : [];
    } catch (error) {
        console.log('Error get comments by Lesson:', error);

    }
};

export async function createNewComment(params: ICreateCommentParams): Promise<boolean | undefined> {
    try {
        connectToDatabase();
        const newComment = await Comment.create(params);
        return (!newComment?._id) ? false : true;
    } catch (error) {
        console.log('Error create new comment:', error);
    }
}