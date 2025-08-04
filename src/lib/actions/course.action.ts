'use server';
import { ICourseUpdateParams, ICreateCourseParams, IGetAllCourseParams, IUpdateCourseParams, IStudyCoursesProps, IFilterData } from "@/types";
import { connectToDatabase } from "../mongoose";
import Course, { ICourse } from "@/database/course.model";
import { revalidatePath } from "next/cache";
import Lecture from "@/database/lecture.model";
import Lesson from "@/database/lesson.model";
import { FilterQuery } from "mongoose";
import { ECourseStatus, ERatingStatus } from "@/types/enums";
import Rating from "@/database/rating.model";

export async function getAllCoursesPublic(params: IGetAllCourseParams): Promise<IStudyCoursesProps[] | undefined> {
    try {
        connectToDatabase();
        const { page = 1, limit = 10, search = "" } = params;
        const skip = (page - 1) * limit;
        const query: FilterQuery<typeof Course> = {};
        if (search)
            query.$or = [{ title: { $regex: search, $options: 'i' } }];
        query.status = ECourseStatus.APPROVED; // Chỉ lấy các khóa học đã được phê duyệt
        const listCourses = await Course.find(query).skip(skip).limit(limit).sort({ created_at: -1 });
        return listCourses ? JSON.parse(JSON.stringify(listCourses)) : [];
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}


export async function getAllCourses(params: IFilterData): Promise<ICourse[] | undefined> {
    try {
        connectToDatabase();
        const { page = 1, limit = 10, search = "", status } = params;
        const skip = (page - 1) * limit;
        const query: FilterQuery<typeof Course> = {};
        if (search)
            query.$or = [{ title: { $regex: search, $options: 'i' } }];
        if (status)
            query.status = status;
        const listCourses = await Course.find(query).skip(skip).limit(limit).sort({ created_at: -1 });
        return listCourses ? JSON.parse(JSON.stringify(listCourses)) : [];
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

export async function getCourseBySlug({ slug }: { slug: string }): Promise<ICourseUpdateParams | undefined> {
    try {
        connectToDatabase();
        const findCourse = await Course.findOne({ slug })
            .populate({
                path: 'lectures',
                model: Lecture,
                select: "_id title",
                match: { _destroy: false },
                populate: {
                    path: "lessons",
                    model: Lesson,
                    match: { _destroy: false },
                },
            })
            .populate({
                path: 'rating',
                model: Rating,
                match: {
                    status: ERatingStatus.ACTIVE
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

// hàm tăng view khóa học mỗi khi truy cập
export async function updateCourseView({ slug }: { slug: string }) {
    try {
        connectToDatabase();
        await Course.findOneAndUpdate({ slug }, {
            $inc: { views: 1 },
        })
    } catch (error) {
        console.log(error);
    }
}

// hàm trả về Tổng thời lượng và Số bài học của Khóa học
export async function getCourseLessonsInfo({ slug }: { slug: string }): Promise<
    | {
        duration: number;
        lessons: number;
    }
    | undefined
> {
    try {
        connectToDatabase();
        const course = await Course.findOne({ slug })
            .select("lectures")
            .populate({
                path: "lectures",
                select: "lessons",
                populate: {
                    path: "lessons",
                    select: "duration",
                },
            });
        const lessons = course?.lectures.map((l: any) => l.lessons).flat();
        const duration = lessons.reduce(
            (acc: number, cur: any) => acc + cur.duration,
            0
        );
        return {
            duration,
            lessons: lessons.length,
        };
    } catch (error) { }
}