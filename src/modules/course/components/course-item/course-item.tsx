'use client';

import Image from 'next/image';
import Link from 'next/link';

import { formatNumberToK } from '@/utils';

import { IconEye, IconStar } from '../../../../shared/components/icons';
import { ICourseItemData } from '../../types';
import CourseItemDuration from './course-item-duration';

interface ICourseItemProps {
  data?: ICourseItemData;
  cta?: string;
  url?: string;
}

const CourseItem = ({
  cta = 'Xem chi tiết',
  data,
  url = '',
}: ICourseItemProps) => {
  const courseUrl = url || `/course/${data?.slug}`;

  const courseInfo = [
    {
      title: formatNumberToK(data?.views ?? 0),
      icon: <IconEye className={'size-4'} />,
    },
    {
      title: 5,
      icon: <IconStar className={'size-4'} />,
    },
  ];

  return (
    <div className="dark:border-opacity/10 flex flex-col rounded-2xl border border-gray-200 bg-white p-4 dark:bg-grayDarker">
      <Link
        className="relative block h-[180px]"
        href={courseUrl}
      >
        <Image
          priority
          alt=""
          className="size-full rounded-lg object-cover"
          height={200}
          sizes="@media (min-width: 640px) 300px, 100vw"
          width={300}
          src={
            data?.image ||
            'https://images.unsplash.com/photo-1682685796014-2f342188a635?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
        />
        <span className="absolute right-3 top-3 z-10 inline-block animate-pulse rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
          New
        </span>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <h3 className="mb-5 text-lg font-bold">{data?.title}</h3>
        <div className="mt-auto">
          <div className="mb-5 flex items-center gap-3 text-xs text-gray-500 dark:text-grayDark">
            {courseInfo?.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-2"
              >
                {item.icon}
                <span>{item?.title}</span>
              </div>
            ))}
            <CourseItemDuration slug={data?.slug || ''} />
            <span className="ml-auto text-base font-bold text-primary">
              {data?.price?.toLocaleString()}đ
            </span>
          </div>
          <Link
            className="button-primary mt-10 flex h-12 w-full items-center justify-center rounded-lg bg-primary font-semibold text-white"
            href={courseUrl}
          >
            {cta}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
