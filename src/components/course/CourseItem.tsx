'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IconClock, IconEye, IconStar } from '../icons';
import { commonClassName } from '@/constants';
import { IStudyCoursesProps } from '@/types';
import { formatMinutesToHour, formatNumberToK } from '@/utils';
import { getCourseLessonsInfo } from '@/lib/actions/course.action';

const CourseItem = ({ data, cta, url = '' }: { data?: IStudyCoursesProps; cta?: string; url?: string; }) => {
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        async function getDuration() {
            const res = await getCourseLessonsInfo({ slug: data?.slug || '' });
            setDuration(res?.duration || 0);
        };

        getDuration();
    }, [data?.slug]);

    const courseInfo = [
        {
            title: formatNumberToK(data?.views ?? 0),
            icon: (className?: string) => <IconEye className={className} />
        },
        {
            title: 5,
            icon: (className?: string) => <IconStar className={className} />
        },
        {
            title: formatMinutesToHour(duration),
            icon: (className?: string) => <IconClock className={className} />
        }
    ];

    const courseUrl = url ? url : `/course/${data?.slug}`;
    return (
        <div className='bg-white dark:bg-grayDarker dark:border-opacity-10 border border-gray-200 p-4 rounded-2xl flex flex-col'>
            <Link className='block h-[180px] relative' href={courseUrl}>
                <Image
                    src={data?.image || 'https://images.unsplash.com/photo-1682685796014-2f342188a635?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                    alt=''
                    width={300}
                    height={200}
                    className='w-full h-full object-cover rounded-lg'
                    sizes='@media (min-width: 640px) 300px, 100vw'
                    priority
                />
                <span className='inline-block px-3 py-1 rounded-full absolute top-3 right-3 z-10 text-white font-medium
                 bg-green-500 text-xs animate-pulse'>
                    New
                </span>
            </Link>

            <div className="pt-4 flex flex-col flex-1">
                <h3 className='font-bold text-lg mb-5'>
                    {data?.title}
                </h3>
                <div className='mt-auto'>
                    <div className="flex items-center gap-3 mb-5 text-xs text-gray-500 dark:text-grayDark">
                        {courseInfo?.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                {item?.icon("size-4")}
                                <span>{item?.title}</span>
                            </div>
                        ))}
                        <span className='font-bold text-primary ml-auto text-base'>{data?.price?.toLocaleString()}đ</span>
                    </div>
                    <Link href={courseUrl} className={commonClassName.btnPrimary} >
                        {cta || "Xem chi tiết"}
                    </Link>
                </div>
            </div>
        </div >
    );
};

export default CourseItem;