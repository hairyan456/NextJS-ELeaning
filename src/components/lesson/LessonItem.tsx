import Link from "next/link";
import { IconPlay } from "../icons";
import { cn } from "@/lib/utils";

interface ILessonItem {
    lesson: {
        title: string;
        duration: number;
    };
    url?: string;
    isActive?: boolean
};

const LessonItem = ({ lesson, url, isActive }: ILessonItem) => {
    return (
        <div className={cn('flex items-center gap-3 bgDarkMode borderDarkMode rounded-lg p-4 text-sm font-medium',
            isActive ? "text-primary font-semibold pointer-events-none" : "")}
        >
            <IconPlay className='size-5 flex-shrink-0' />
            {url ?
                <Link href={url} className="line-clamp-1">
                    {lesson.title}
                </Link>
                :
                <h4 className="line-clamp-1">{lesson.title || ''}</h4>
            }
            <span className='ml-auto text-xs font-semibold  flex-shrink-0'>{lesson.duration} phút</span>
        </div>
    );
};

export default LessonItem;