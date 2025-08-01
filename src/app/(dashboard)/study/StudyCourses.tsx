"use client";

import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import { lastLessonKey } from "@/constants";
import { IStudyCoursesProps } from "@/types";

const StudyCourses = ({ courses }: { courses: IStudyCoursesProps[] | null | undefined }) => {
    if (!courses || courses.length === 0) return null;
    let lastLesson: any[] = [];
    if (typeof localStorage !== 'undefined') {
        lastLesson = localStorage ? JSON.parse(localStorage?.getItem(lastLessonKey) || '[]') || [] : [];
    }

    return (
        <CourseGrid>
            {courses && courses?.length > 0 && courses.map((item) => {
                const url = lastLesson?.find((el: any) => el?.course === item.slug)?.lesson || "";
                const firstLessonUrl = item.lectures[0]?.lessons[0]?.slug;
                return (
                    <CourseItem
                        key={item.slug}
                        data={item}
                        cta={"Tiếp tục học"}
                        url={url || `${item.slug}/lesson?slug=${firstLessonUrl}`}
                    />
                )
            })}
        </CourseGrid>
    );
};

export default StudyCourses;