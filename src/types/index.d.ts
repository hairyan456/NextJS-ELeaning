import { ICourse } from "@/database/course.model";
import { ILecture } from "@/database/lecture.model";

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

interface ICourseUpdateParams extends Omit<ICourse, "lectures"> {
    lectures: ILecture[];

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

export {
    IActiveLinkProps, IMenuItems, ICreateUserParams, ICreateCourseParams, IUpdateCourseParams, ICreateLectureParams,
    IUpdateLectureParams, ICourseUpdateParams
};