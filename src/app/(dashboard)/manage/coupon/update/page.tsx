import Heading from '@/components/typography/Heading';
import React from 'react';
import UpdateCouponForm from './UpdateCouponForm';

const page = () => {
    return (
        <div>
            <Heading className="mb-10">Cập nhật mã giảm giá</Heading>
            <UpdateCouponForm></UpdateCouponForm>
        </div>
    );
};

export default page;