'use client';
import Link from "next/link";
import { IconPlay } from "../icons";
import { cn } from "@/lib/utils";
import { createNewHistory } from "@/lib/actions/history.action";
import { Checkbox } from "@/shared/components/ui/checkbox";

interface ILessonItem {
    lesson: {
        title: string;
        duration: number;
        course: string;
        _id: string;
    };
    url?: string;
    isActive?: boolean;
    isChecked?: boolean;
};

const LessonItem = ({ lesson, url, isActive = false, isChecked = false }: ILessonItem) => {
    const handleCompleteLesson = async (checked: boolean | string) => {
        try {
            await createNewHistory({
                course: lesson.course,
                lesson: lesson._id,
                checked,
                path: url,
            });
        } catch (error) {
            console.error("Error when checking lesson:", error);
        }
    };

    return (
        <div className={cn('flex items-center gap-3 bgDarkMode borderDarkMode rounded-lg p-4 text-sm font-medium',
            isActive ? "font-bold" : "")}
        >
            {url &&
                <Checkbox
                    className="flex-shrink-0 size-4"
                    defaultChecked={isChecked}
                    onCheckedChange={(checked) => handleCompleteLesson(checked)}
                />
            }
            <IconPlay className='size-5 flex-shrink-0' />
            {url ?
                <Link href={url} className={cn("line-clamp-1", isActive && 'pointer-events-none')}>
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