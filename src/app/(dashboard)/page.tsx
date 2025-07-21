import { CourseGrid } from '@/components/common';
import CourseItem from '@/components/course/CourseItem';
import Heading from '@/components/typography/Heading';
import createNewUser from '@/lib/actions/user.actions';
import React from 'react';

const page = async () => {
    const user = await createNewUser({
        clerkId: "123",
        email_address: "hai@gmail.com",
        username: "hai0702"
    })
    return (
        <div>
            <Heading>Khám phá</Heading>
            <CourseGrid>
                <CourseItem></CourseItem>
                <CourseItem></CourseItem>
                <CourseItem></CourseItem>
                <CourseItem></CourseItem>
                <CourseItem></CourseItem>
            </CourseGrid>
        </div>
    );
};

export default page;