import { Heading } from '@/shared/components';
import { getUserCourses } from '@/lib/actions/user.actions';
import React from 'react';
import StudyCourses from './StudyCourses';

const page = async () => {
    const courses = await getUserCourses();
    return (
        <>
            <Heading>Khu vực học tập</Heading>
            <StudyCourses
                courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
            />
        </>
    );
};

export default page;