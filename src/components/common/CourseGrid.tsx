import React from 'react';

const CourseGrid = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 lg:gap-8 mt-6 course-slider'>
            {children}
        </div>
    );
};

export default CourseGrid;