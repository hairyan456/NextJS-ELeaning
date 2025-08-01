'use client';
import { IconPlay, IconStudy, IconUsers } from '@/components/icons';
import ButtonEnroll from './ButtonEnroll';
import CouponForm from './CouponForm';
import { useState } from 'react';

const CourseWidget = ({ data, findUser, duration }: { data: any; findUser: any; duration: string; }) => {
    const [coupon, setCoupon] = useState<any>("");
    const [price, setPrice] = useState<number>(data?.price ?? 0);

    return (
        <>
            <div className='bgDarkMode border borderDarkMode rounded-lg p-5'>
                <div className="flex items-center gap-2 mb-3">
                    <strong className="text-primary text-xl font-bold">{price?.toLocaleString()}đ</strong>
                    <span className="text-slate-400 line-through text-sm">{data.sale_price.toLocaleString()}đ</span>
                    <span className={`ml-auto inline-block px-3 py-1 rounded-lg bg-primary bg-opacity-10 text-primary 
                        font-semibold text-sm`}>
                        {Math.floor((price / data.sale_price) * 100)} %
                    </span>
                </div>
                <h3 className='font-bold mb-3 text-sm'>Khóa học gồm có:</h3>
                <ul className="mb-5 flex flex-col gap-3 text-sm text-slate-500">
                    <li className='flex items-center gap-2'>
                        <IconPlay className='size-4' />
                        <span>{duration} học</span>
                    </li>
                    <li className='flex items-center gap-2'>
                        <IconPlay className='size-4' />
                        <span>Video full HD</span>
                    </li>
                    <li className='flex items-center gap-2'>
                        <IconUsers className='size-4' />
                        <span>Có nhóm hỗ trợ</span>
                    </li>
                    <li className='flex items-center gap-2'>
                        <IconPlay className='size-4' />
                        <span>Có nhóm hỗ trợ</span>
                    </li>
                    <li className='flex items-center gap-2'>
                        <IconStudy className='size-4' />
                        <span>Tài liệu đính kèm</span>
                    </li>
                </ul>
                <ButtonEnroll
                    user={findUser}
                    courseId={data ? JSON.parse(JSON.stringify(data._id)) : null}
                    amount={price}
                    coupon={coupon}
                />
                <CouponForm
                    setCouponId={setCoupon}
                    originalPrice={data?.price ?? 0}
                    setPrice={setPrice}
                    courseId={data ? JSON.parse(JSON.stringify(data?._id)) : null}
                />
            </div>
        </>
    );
};

export default CourseWidget;