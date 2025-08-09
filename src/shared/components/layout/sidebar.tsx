'use client';
import { useAuth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

import { MenuItem, ModeToggle } from '@/shared/components';
import { IconUsers } from '@/shared/components/icons';
import { menuItems } from '@/shared/constants';

const Sidebar = () => {
  const { userId } = useAuth();

  return (
    <div className="borderDarkMode bgDarkMode fixed inset-y-0 left-0 hidden h-screen w-[300px] flex-col border-r p-5 lg:flex">
      <Link
        className="logo mb-5 inline-block text-3xl font-bold"
        href="/"
      >
        <span className="text-primary">E</span>
        Academy
      </Link>
      <ul className="flex flex-col gap-2">
        {menuItems?.map((item) => (
          <MenuItem
            key={item.url}
            icon={item.icon}
            title={item.title}
            url={item.url}
          />
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-end gap-5">
        <ModeToggle />
        {!userId ? (
          <Link
            className="flex size-10 items-center justify-center rounded-lg bg-primary p-1 text-white"
            href={'/sign-in'}
          >
            <IconUsers />
          </Link>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
