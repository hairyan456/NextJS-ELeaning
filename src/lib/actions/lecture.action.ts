'use server';
import { ICreateLectureParams, IUpdateLectureParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Course from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import { revalidatePath } from "next/cache";

export async function createNewLecture(params: ICreateLectureParams) {
    try {
        connectToDatabase();
        const findCourse = await Course.findById(params.course);
        if (!findCourse) return;

        const newLecture = await Lecture.create(params);
        findCourse?.lectures.push(newLecture?._id);
        findCourse.save();
        revalidatePath(params?.path || "/");

        return {
            success: true,
            message: "Tạo chương mới thành công!",
        }
    } catch (error) {
        console.error("Error creating new lecture:", error);
    }
}

export async function updateLecture(params: IUpdateLectureParams) {
    try {
        connectToDatabase();
        const res = await Lecture.findByIdAndUpdate(params.lectureId, params.updateData, { new: true });
        revalidatePath(params?.updateData?.path || "/");
        if (!res)
            return;
        return {
            success: true,
        }
    } catch (error) {
        console.error("Error updating lecture:", error);
    }
}