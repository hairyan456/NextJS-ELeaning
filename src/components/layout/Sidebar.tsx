import React from 'react';
import { menuItems } from '@/constants';
import ActiveLink from '../common/ActiveLink';
import { IMenuItems } from '@/types';

const Sidebar = () => {
    return (
        <div className='p-5 border-r border-r-gray-200'>
            <a href='/' className="logo font-bold text-3xl inline-block mb-5">
                <span className='text-primary'>E</span>
                Academy
            </a>
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