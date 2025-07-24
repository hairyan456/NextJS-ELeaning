import Sidebar, { MenuItem } from '@/components/layout/Sidebar';
import { menuItems } from '@/constants';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="wrapper block lg:grid lg:grid-cols-[300px,minmax(0,1fr)] h-screen pb-20 lg:pb-0">
            <Sidebar />
            <ul className='flex p-3 bgDarkMode border-t borderDarkMode lg:hidden fixed bottom-0 left-0 w-full
             justify-center gap-5 h-16'>
                {menuItems?.map((item, index) => (
                    <MenuItem
                        key={item.url}
                        title={item.title}
                        url={item.url}
                        icon={item.icon}
                        onlyIcon={true}
                    />
                ))}
            </ul>
            <div className='hidden lg:block' />
            <main className='p-5'>{children}</main>
        </div>
    );
};

export default layout; 