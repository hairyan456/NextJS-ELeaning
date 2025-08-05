import { ICoupon } from "@/database/coupon.model";
import { ICourse } from "@/database/course.model";
import { ILecture } from "@/database/lecture.model";
import { ILesson } from "@/database/lesson.model";
import { ECouponType } from "./enums";
import { IComment } from "@/database/comment.model";

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
interface IGetAllCourseParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
};

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

// History
interface ICreateHistoryParams {
    course: string;
    lesson: string;
    checked: boolean | string;
    path?: string;
};

// Order
interface ICreateOrderParams {
    code: string;
    course: string;
    user: string;
    total?: number;
    amount?: number;
    discount?: number;
    coupon?: string;
};

// Coupon
type TCreateCouponParams = {
    title: string;
    code: string;
    type: ECouponType;
    value?: number;
    start_date?: Date;
    end_date?: Date;
    active?: boolean;
    limit?: number;
    course?: string[];
};

type TUpdateCouponParams = {
    _id: string;
    updateData: Partial<TCreateCouponParams>;
};


type TCouponParams = Omit<ICoupon, "course"> & {
    course: {
        _id: string;
        title: string;
    }[]
}

interface IStudyCoursesProps extends Omit<ICourse, "lectures"> {
    lectures: {
        lessons: {
            slug: string;
        }[]
    }[];
};

type TRatingIcon = "awesome" | "good" | "meh" | "bad" | "terrible";

interface ICreateRatingParams {
    rate: number;
    content: string;
    user: string;
    course: string;
}

type TRatingItem = {
    _id: string;
    content: string;
    rate: number;
    created_at: string;
    course: {
        slug: string;
        title: string;
    },
    user: {
        name: string;
    },
    status: ERatingStatus,
}

type TCouponItem = Omit<ICoupon, "_id" | "course">;

// filter, paginate
interface IFilterData {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    active?: boolean;
};

// COMMENT

interface ICreateCommentParams {
    content: string;
    lesson: string;
    user: string;
}

interface ICommentItem extends Omit<IComment, "user"> {
    user: {
        name: string;
        avatar: string;
    }
}

export {
    IActiveLinkProps, IMenuItems, ICreateUserParams, ICreateCourseParams, IUpdateCourseParams, ICreateLectureParams,
    IUpdateLectureParams, ICourseUpdateParams, ICreateLessonParams, IUpdateCourseLecture, IUpdateLessonParams,
    ICreateHistoryParams, IGetAllCourseParams,
    ICreateOrderParams, TCreateCouponParams, TCouponParams, TUpdateCouponParams, IStudyCoursesProps,
    TRatingIcon, ICreateRatingParams, TRatingItem, IFilterData, TCouponItem,
    ICreateCommentParams, ICommentItem
};