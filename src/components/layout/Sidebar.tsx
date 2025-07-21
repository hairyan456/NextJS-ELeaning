import React from 'react';
import { menuItems } from '@/constants';
import { IMenuItems } from '@/types';
import Link from 'next/link';
import { ActiveLink } from '../common';
import { UserButton } from '@clerk/nextjs';

const Sidebar = () => {
    return (
        <div className='p-5 border-r border-r-gray-200 bg-white flex flex-col'>
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
            <div className="mt-auto flex items-center justify-end">
                <UserButton />
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