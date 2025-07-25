'use client';

import { IconArrowLeft, IconArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LessonNavigation = ({ nextLesson, prevLesson }: { nextLesson: string; prevLesson: string; }) => {
    const router = useRouter();
    return (
        <div className="flex gap-3">
            <Button
                disabled={!prevLesson}
                className="size-10 p-3 text-white"
                onClick={() => !prevLesson ? null : router.push(prevLesson)}
            >
                <IconArrowLeft />
            </Button>
            <Button
                disabled={!nextLesson}
                className="size-10 p-3 text-white"
                onClick={() => !nextLesson ? null : router.push(nextLesson)}
            >
                <IconArrowRight />
            </Button>
        </div>

    );
};

export default LessonNavigation;