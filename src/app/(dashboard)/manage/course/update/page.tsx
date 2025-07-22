import CourseUpdateForm from '@/components/course/CourseUpdateForm';
import Heading from '@/components/typography/Heading';
import { getCourseBySlug } from '@/lib/actions/course.action';
import React from 'react';

const page = async ({ searchParams }: { searchParams: { slug: string; } }) => {
    const findCourse = await getCourseBySlug({ slug: searchParams.slug });
    if (!findCourse)
        return <></>;
    return (
        <>
            <Heading className='mb-8'>Cập nhật khóa học</Heading>
            {/* Form CourseUpdate */}
            <CourseUpdateForm />
        </>
    );
};

export default page;