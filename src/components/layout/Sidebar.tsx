'use client';
import React from 'react';
import { menuItems } from '@/constants';
import { IMenuItems } from '@/types';
import Link from 'next/link';
import { ActiveLink } from '../common';
import { UserButton, useAuth } from '@clerk/nextjs';
import { ModeToggle } from '../common/ModeToggle';
import { IconUsers } from '../icons';

const Sidebar = () => {
    const { userId } = useAuth();
    return (
        <div className='hidden p-5 border-r border-r-gray-200 bg-white dark:bg-grayDarker dark:border-opacity-10 
        lg:flex flex-col fixed top-0 left-0 bottom-0 w-[300px] h-screen'>
            <Link href='/' className="logo font-bold text-3xl inline-block mb-5">
                <span className='text-primary'>E</span>
                Academy
            </Link>
            <ul className='flex flex-col gap-2'>
                {menuItems?.map((item, index) => (
                    <MenuItem
                        key={item.url}
                        title={item.title}
                        url={item.url}
                        icon={item.icon}
                    />
                ))}
            </ul>
            <div className="mt-auto flex items-center justify-end gap-5">
                <ModeToggle />
                {!userId ?
                    <Link href={'/sign-in'} className='size-10 rounded-lg bg-primary text-white flex items-center justify-center p-1'>
                        <IconUsers />
                    </Link>
                    :
                    <UserButton />
                }
            </div>
        </div>
    );
};

function MenuItem({ url = "/", title = "", icon }: IMenuItems) {
    return (
        <li>
            <ActiveLink
                url={url}
            >
                {icon}
                {title}
            </ActiveLink>
        </li>
    )
};


export default Sidebar;