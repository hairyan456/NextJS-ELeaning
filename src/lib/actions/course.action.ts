'use server';
import { ICreateCourseParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Course from "@/database/course.model";

export async function getCourseBySlug({ slug }: { slug: string }) {
    try {
        connectToDatabase();
        const findCourse = await Course.findOne({ slug });;
        return findCourse ? JSON.parse(JSON.stringify(findCourse)) : null;
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

