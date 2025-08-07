'use client';
import Link from 'next/link';
import { UserButton, useAuth } from '@clerk/nextjs';
import { MenuItem, ModeToggle } from '@/shared/components';
import { IconUsers } from '@/shared/components/icons';
import { menuItems } from '@/shared/constants';

const Sidebar = () => {
    const { userId } = useAuth();
    return (
        <div className='hidden p-5 border-r borderDarkMode bgDarkMode lg:flex flex-col fixed top-0 left-0 bottom-0 w-[300px] h-screen'>
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


export default Sidebar;