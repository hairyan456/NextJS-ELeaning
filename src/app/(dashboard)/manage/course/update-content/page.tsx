import CourseUpdateContent from '@/components/course/CourseUpdateContent';
import { Heading } from '@/shared/components';
import { getCourseBySlug } from '@/lib/actions/course.action';
import React from 'react';

const page = async ({ searchParams }: { searchParams: { slug: string; } }) => {
    const findCourse = await getCourseBySlug({ slug: searchParams.slug });
    if (!findCourse)
        return <>Không tìm thấy khóa học.</>

    return (
        <>
            <Heading className='mb-10'>Nội dung: <strong className='text-primary'>{findCourse.title}</strong></Heading>
            <CourseUpdateContent
                course={JSON.parse(JSON.stringify(findCourse))}
            >

            </CourseUpdateContent>
        </>
    );
};

export default page;