import CourseItem from '@/components/course/CourseItem';
import Heading from '@/components/typography/Heading';
import { getAllCoursesPublic } from '@/lib/actions/course.action';
import { CourseGrid } from '@/shared/components';
import React from 'react';

const page = async () => {
    const courses = await getAllCoursesPublic({}) || [];

    return (
        <div>
            <Heading>Khám phá</Heading>
            <CourseGrid>
                {courses?.length > 0 && courses.map((item) => (
                    <CourseItem
                        key={item.slug}
                        data={item} />
                ))}
            </CourseGrid>
        </div>
    );
};

export default page;