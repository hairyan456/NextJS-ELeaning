import CourseManage from '@/components/course/CourseManage';
import { getAllCourses } from '@/lib/actions/course.action';
import React from 'react';

const page = async () => {
    const courses = await getAllCourses();
    return (
        <>
            <CourseManage
                courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
            />
        </>
    );
};

export default page;