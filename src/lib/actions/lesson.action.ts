'use server';
import { revalidatePath } from 'next/cache';

import Course from '@/database/course.model';
import Lecture from '@/database/lecture.model';
import { connectToDatabase } from '@/shared/lib/mongoose';
import { LessonModel } from '@/shared/schemas';
import {
  ICreateLessonParams,
  ILesson,
  IUpdateLessonParams,
} from '@/shared/types';

export async function getLessonBySlug({
  course,
  slug,
}: {
  slug: string;
  course: string;
}): Promise<ILesson | undefined> {
  try {
    connectToDatabase();
    const findLesson = await LessonModel.findOne({ slug, course }).select(
      'title video_url content',
    );

    return findLesson ? JSON.parse(JSON.stringify(findLesson)) : undefined;
  } catch (error) {
    console.error('Error fetching lesson by slug:', error);
  }
}

export async function findAllLessons({
  course,
}: {
  course: string;
}): Promise<ILesson[] | undefined> {
  try {
    connectToDatabase();
    const lessons = await LessonModel.find({ course }).select(
      'title slug video_url content',
    );

    return lessons ? JSON.parse(JSON.stringify(lessons)) : undefined;
  } catch (error) {
    console.error('Error fetching all lessons:', error);
  }
}

export async function countLessonsByCourseId({
  courseId,
}: {
  courseId: string;
}): Promise<number | undefined> {
  try {
    connectToDatabase();
    const count = await LessonModel.countDocuments({ course: courseId });

    return count || 0;
  } catch (error) {
    console.error('Error count lessons by courseId:', error);
  }
}

export async function createNewLesson(params: ICreateLessonParams) {
  try {
    connectToDatabase();
    const findCourse = await Course.findById(params.course);

    if (!findCourse) return;
    const findLecture = await Lecture.findById(params.lecture);

    if (!findLecture) return;
    const newLesson = await LessonModel.create(params);

    findLecture.lessons.push(newLesson._id);
    await findLecture.save();
    revalidatePath(params?.path || '/');
    if (!newLesson) return;

    return { success: true };
  } catch (error) {
    console.error('Error creating new lesson:', error);
  }
}

export async function updateLesson(params: IUpdateLessonParams) {
  try {
    connectToDatabase();
    const response = await LessonModel.findByIdAndUpdate(
      params.lessonId,
      params.updateData,
      { new: true },
    );

    revalidatePath(params?.path || '/');
    if (!response) return;

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error updating lesson:', error);
  }
}
