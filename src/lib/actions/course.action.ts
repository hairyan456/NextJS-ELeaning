'use server';
import { ICourseUpdateParams, ICreateCourseParams, IUpdateCourseParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Course, { ICourse } from "@/database/course.model";
import { revalidatePath } from "next/cache";
import Lecture from "@/database/lecture.model";
import Lesson from "@/database/lesson.model";

export async function getAllCourses(): Promise<ICourse[] | undefined> {
    try {
        connectToDatabase();
        const listCourses = await Course.find();
        return listCourses;
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

export async function getCourseBySlug({ slug }: { slug: string }): Promise<ICourseUpdateParams | undefined> {
    try {
        connectToDatabase();
        const findCourse = await Course.findOne({ slug }).populate({
            path: 'lectures',
            model: Lecture,
            select: "_id title",
            match: { _destroy: false },
            populate: {
                path: "lessons",
                model: Lesson,
                match: { _destroy: false },
            },
        });
        return findCourse ? JSON.parse(JSON.stringify(findCourse)) : undefined;
    } catch (error) {
        console.error("Error fetching course by slug:", error);
    }
}

export async function createNewCourse(params: ICreateCourseParams) {
    try {
        connectToDatabase();
        // kiểm tra đường dẫn url có bị trùng hay không
        const existingCourse = await Course.findOne({ slug: params.slug });
        if (existingCourse) {
            return {
                success: false,
                message: "Khóa học đã tồn tại",
            };
        }
        const course = await Course.create(params);
        return {
            success: true,
            data: JSON.parse(JSON.stringify(course)),
            message: "Tạo khóa học thành công.",
        }
    } catch (error) {
        console.error("Error creating new course:", error);
    }
};

export async function updateCourse(params: IUpdateCourseParams) {
    try {
        connectToDatabase();
        const findCourse = await Course.findOne({ slug: params.slug });
        if (!findCourse) {
            return {
                success: false,
                message: "Khóa học không tồn tại",
            };
        }
        else {
            await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, { new: true });
            revalidatePath(params.path || '/');  // giống refetch trong React Query 
            return {
                success: true,
                message: "Cập nhật khóa học thành công",
            };
        }
    } catch (error) {
        console.error("Error updating course:", error);
    }
}

