import { ICourse } from "@/database/course.model";
import { ILecture } from "@/database/lecture.model";
import { ILesson } from "@/database/lesson.model";

interface IActiveLinkProps {
    url: string;
    children: React.ReactNode;
};

interface IMenuItems {
    url: string;
    title: string;
    icon?: React.ReactNode
    onlyIcon?: boolean;
}

// User
interface ICreateUserParams {
    clerkId: string;
    username: string;
    email: string;
    name?: string;
    avatar?: string;
};

// Course
interface ICreateCourseParams {
    title: string;
    slug: string;
    author: string;
}

interface IUpdateCourseParams {
    slug: string;
    updateData: Partial<ICourse>;
    path?: string;
}

interface IUpdateCourseLecture {
    _id: string;
    title: string;
    lessons: ILesson[];
};

interface ICourseUpdateParams extends Omit<ICourse, "lectures"> {
    lectures: IUpdateCourseLecture[];

}

// Lecture
interface ICreateLectureParams {
    course: string;
    title?: string;
    order?: number;
    path?: string;
}

interface IUpdateLectureParams {
    lectureId: string;
    updateData: {
        title?: string;
        order?: number;
        _destroy?: boolean;
        path?: string;
    }
}

// Lesson
interface ICreateLessonParams {
    lecture: string;
    course: string;
    title?: string;
    order?: number;
    path?: string;
    slug?: string;
}

interface IUpdateLessonParams {
    lessonId: string;
    updateData: {
        title?: string;
        slug?: string;
        duration?: number;
        video_url?: string;
        content?: string;
    }
    path?: string;
}

export {
    IActiveLinkProps, IMenuItems, ICreateUserParams, ICreateCourseParams, IUpdateCourseParams, ICreateLectureParams,
    IUpdateLectureParams, ICourseUpdateParams, ICreateLessonParams, IUpdateCourseLecture, IUpdateLessonParams
};