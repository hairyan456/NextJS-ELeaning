'use client';

import { lastLessonKey } from "@/shared/constants";
import { useEffect } from "react";

const LessonSaveUrl = ({ url, course }: { url: string; course: string; }) => {

    useEffect(() => {
        let results: any[] = localStorage?.getItem(lastLessonKey) ? JSON.parse(localStorage.getItem(lastLessonKey) || '[]') : [];
        const item = {
            course, lesson: url
        };
        results = results.filter((item) => item.course !== course);
        results.push(item);
        localStorage.setItem(lastLessonKey, JSON.stringify(results));
    }, [url, course]);

    return (
        <></>
    );
};

export default LessonSaveUrl;