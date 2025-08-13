'use client';
import { useState } from 'react';

import { ICourseItemData } from '@/modules/course/types';
import { IconPlay, IconStudy, IconUsers } from '@/shared/components/icons';
import { useUserContext } from '@/shared/contexts';

import AlreadyEnroll from './already-enroll';
import ButtonEnroll from './button-enroll';
import CouponForm from './coupon-form';

interface ICoursseWidgetProps {
  data: ICourseItemData;
  duration: string;
}

const CourseWidget = ({ data, duration }: ICoursseWidgetProps) => {
  const [price, setPrice] = useState<number>(data?.price ?? 0);
  const [coupon, setCoupon] = useState('');
  const { userInfo } = useUserContext();

  const isAlreadyEnrolled = userInfo?.courses
    ? JSON.parse(JSON.stringify(userInfo.courses))?.includes(data._id)
    : false;

  if (isAlreadyEnrolled) return <AlreadyEnroll />;

  return (
    <>
      <div className="bgDarkMode borderDarkMode rounded-lg border p-5">
        <div className="mb-3 flex items-center gap-2">
          <strong className="text-xl font-bold text-primary">
            {price?.toLocaleString()}đ
          </strong>
          <span className="text-sm text-slate-400 line-through">
            {data.sale_price.toLocaleString()}đ
          </span>
          <span
            className={
              'ml-auto inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary'
            }
          >
            {Math.floor((price / data.sale_price) * 100)} %
          </span>
        </div>
        <h3 className="mb-3 text-sm font-bold">Khóa học gồm có:</h3>
        <ul className="mb-5 flex flex-col gap-3 text-sm text-slate-500">
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>{duration} học</span>
          </li>
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>Video full HD</span>
          </li>
          <li className="flex items-center gap-2">
            <IconUsers className="size-4" />
            <span>Có nhóm hỗ trợ</span>
          </li>
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>Có nhóm hỗ trợ</span>
          </li>
          <li className="flex items-center gap-2">
            <IconStudy className="size-4" />
            <span>Tài liệu đính kèm</span>
          </li>
        </ul>
        <ButtonEnroll
          amount={price}
          coupon={coupon}
          courseId={data._id.toString()}
        />
        <CouponForm
          courseId={data ? JSON.parse(JSON.stringify(data?._id)) : null}
          originalPrice={data?.price ?? 0}
          setCouponId={setCoupon}
          setPrice={setPrice}
        />
      </div>
    </>
  );
};

export default CourseWidget;
