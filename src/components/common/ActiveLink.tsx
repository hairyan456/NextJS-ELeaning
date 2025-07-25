'use client';
import { IActiveLinkProps } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const ActiveLink = ({ url, children }: IActiveLinkProps) => {
    const pathName = usePathname();
    const isActive: boolean = url === pathName;
    return (
        <Link
            href={url}
            className={`p-3 rounded-md flex items-center gap-3 dark:text-grayDark text-base font-medium
                ${isActive ? '!text-primary font-semibold bg-primary bg-opacity-10 svg-animate' : `hover:!text-primary hover:!bg-primary hover:!bg-opacity-10
                hover:transition-all `}
            `}
        >
            {children}
        </Link>
    );
};

export default ActiveLink;