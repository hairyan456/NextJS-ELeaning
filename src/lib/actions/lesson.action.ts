'use server';
import { ICreateLessonParams, IUpdateLessonParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Course from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import Lesson, { ILesson } from "@/database/lesson.model";
import { revalidatePath } from "next/cache";

export async function getLessonBySlug({ slug, course }: { slug: string; course: string; }): Promise<ILesson | undefined> {
    try {
        connectToDatabase();
        const findLesson = await Lesson.findOne({ slug, course });
        return findLesson ? JSON.parse(JSON.stringify(findLesson)) : undefined;
    } catch (error) {
        console.error("Error fetching lesson by slug:", error);
    }
}

export async function findAllLessons({ course }: { course: string; }): Promise<ILesson[] | undefined> {
    try {
        connectToDatabase();
        const lessons = await Lesson.find({ course });
        return lessons ? JSON.parse(JSON.stringify(lessons)) : undefined;
    } catch (error) {
        console.error("Error fetching all lessons:", error);
    }
}

export async function createNewLesson(params: ICreateLessonParams) {
    try {
        connectToDatabase();
        const findCourse = await Course.findById(params.course);
        if (!findCourse) return;
        const findLecture = await Lecture.findById(params.lecture);
        if (!findLecture) return;
        const newLesson = await Lesson.create(params);
        findLecture.lessons.push(newLesson._id);
        await findLecture.save();
        revalidatePath(params?.path || "/");
        if (!newLesson) return;
        return { success: true }
    } catch (error) {
        console.error("Error creating new lesson:", error);
    }
};

export async function updateLesson(params: IUpdateLessonParams) {
    try {
        connectToDatabase();
        const res = await Lesson.findByIdAndUpdate(params.lessonId, params.updateData, { new: true });
        revalidatePath(params?.path || "/");
        if (!res) return;
        return {
            success: true,
        }
    } catch (error) {
        console.error("Error updating lesson:", error);
    }
};