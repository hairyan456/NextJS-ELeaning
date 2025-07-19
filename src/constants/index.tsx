import { IconExplore, IconPlay } from "@/components/icons";
import { IMenuItems } from "@/types";

export const menuItems: IMenuItems[] = [
    {
        url: '/',
        title: 'Khu vực học tập',
        icon: <IconPlay className="size-5" />
    },
    {
        url: '/explore',
        title: 'Khám phá',
        icon: <IconExplore className="size-5" />
    }
];