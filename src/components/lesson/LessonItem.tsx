import Link from "next/link";
import { IconPlay } from "../icons";

const LessonItem = ({ lesson, url }: { lesson: { title: string; duration: number }; url?: string; }) => {
    return (
        <div className='flex items-center gap-3 bgDarkMode borderDarkMode rounded-lg p-4 text-base font-medium'>
            <IconPlay className='size-5' />
            {url ?
                <Link href={url}>{lesson.title}</Link>
                :
                <h4>{lesson.title || ''}</h4>
            }
            <span className='ml-auto text-xs font-semibold'>{lesson.duration} phút</span>
        </div>
    );
};

export default LessonItem;