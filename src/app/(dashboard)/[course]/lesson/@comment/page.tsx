import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

const page = () => {
    return (
        <div>
            <div className='flex flex-col gap-5 mt-10'>
                <Textarea placeholder='Nhập bình luận của bạn...' className='min-h-[150px]' />
                <Button variant={'primary'} className='w-fit ml-auto'>Đăng</Button>
            </div>
            <div className='flex flex-col gap-5 mt-10'>
                <h2 className='text-xl font-bold'>Comments</h2>
                <div className="flex flex-col gap-3">
                    <div className='flex items-start gap-3'>
                        <div className="size-10 rounded-full bg-red-200 flex-shrink-0">
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h4 className='font-bold text-lg'>Haihealer</h4>
                            <p className='mb-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda sapiente aspernatur quod nesciunt illum. A asperiores omnis velit illum nihil sint, quam itaque harum similique consectetur. Quod quae recusandae nulla?</p>
                            <div className='flex items-center gap-5 text-sm text-gray-400 font-medium'>
                                <span>4/8/2025</span>
                                <span className='rounded-full size-1 bg-gray-300'></span>
                                <button type='button'>Reply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;