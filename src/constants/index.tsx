import { IconExplore, IconPlay, IconComment, IconOrder, IconStudy, IconUsers } from "@/components/icons";
import { IMenuItems } from "@/types";
import { ECourseLevel, ECourseStatus } from "@/types/enums";

export const menuItems: IMenuItems[] = [
    {
        url: '/',
        title: 'Khám phá',
        icon: <IconPlay className="size-5" />
    },
    {
        url: '/study',
        title: 'Khu vực học tập',
        icon: <IconStudy className="size-5" />
    },
    {
        url: '/manage/course',
        title: 'Quản lí khóa học',
        icon: <IconExplore className="size-5" />
    },
    {
        url: '/manage/member',
        title: 'Quản lí thành viên',
        icon: <IconUsers className="size-5" />
    },
    {
        url: '/manage/order',
        title: 'Quản lí đơn hàng',
        icon: <IconOrder className="size-5" />
    },
    {
        url: '/manage/comment',
        title: 'Quản lí bình luận',
        icon: <IconComment className="size-5" />
    },
];

export const courseStatus: { title: string; value: ECourseStatus; className?: string }[] = [
    {
        title: 'Đã duyệt',
        value: ECourseStatus.APPROVED,
        className: "text-green-500 bg-green-500",
    },
    {
        title: 'Chờ duyệt',
        value: ECourseStatus.PENDING,
        className: "text-blue-500 bg-blue-500"
    },
    {
        title: 'Từ chối',
        value: ECourseStatus.REJECTED,
        className: "text-red-500 bg-red-500"
    },
]

export const courseLevel: { title: string; value: ECourseLevel }[] = [
    {
        title: 'Dễ',
        value: ECourseLevel.BEGINNER
    },
    {
        title: 'Trung bình',
        value: ECourseLevel.INTERMEDIATE
    },
    {
        title: 'Khó',
        value: ECourseLevel.ADVANCED
    },
]

export const courseLevelTitle: Record<ECourseLevel, string> = {
    [ECourseLevel.BEGINNER]: 'Dễ',
    [ECourseLevel.INTERMEDIATE]: 'Trung bình',
    [ECourseLevel.ADVANCED]: 'Khó',
}

export const commonClassName = {
    status: '!bg-opacity-10 border border-current rounded-md font-medium px-3 py-1 text-xs',
    action: `size-8 rounded-md border flex items-center justify-center p-2
             bg-gray-100 dark:bg-transparent borderDarkMode text-gray-500 hover:bg-white 
             hover:transition-all dark:hover:border-opacity-20`,
    paginationButton: `size-8 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center hover:border-primary hover:text-primary`
}