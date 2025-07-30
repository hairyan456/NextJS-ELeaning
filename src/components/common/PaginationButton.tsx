import { commonClassName } from '@/constants';
import React from 'react';
import { IconArrowLeft, IconArrowRight } from '../icons';

const PaginationButton = () => {
    return (
        <div className="flex justify-end gap-3 mt-5">
            <button className={commonClassName.paginationButton}>
                <IconArrowLeft className='size-4' />
            </button>
            <button className={commonClassName.paginationButton}>
                <IconArrowRight className='size-4' />
            </button>
        </div>
    );
};

export default PaginationButton;