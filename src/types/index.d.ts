import { ICourse } from "@/database/course.model";

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

export { IActiveLinkProps, IMenuItems, ICreateUserParams, ICreateCourseParams, IUpdateCourseParams };