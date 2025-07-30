import Link from 'next/link';
import React from 'react';

const AlreadyEnroll = () => {
    return (
        <div className='bgDarkMode border borderDarkMode rounded-lg p-5'>
            Bạn đã đăng ký khóa học này. Vui lòng nhấn vào <Link className='text-primary font-bold' href={'/study'}> Khu vực học tập</Link>
        </div>
    );
};

export default AlreadyEnroll;