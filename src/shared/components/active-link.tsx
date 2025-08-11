'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface IActiveLinkProps {
  url: string;
  children: React.ReactNode;
}

const ActiveLink = ({ children, url }: IActiveLinkProps) => {
  const pathName = usePathname();
  const isActive: boolean = url === pathName;

  return (
    <Link
      href={url}
      className={`flex items-center gap-3 rounded-md p-3 text-base font-medium dark:text-grayDark ${
        isActive
          ? 'svg-animate bg-primary/10 font-semibold !text-primary'
          : 'hover:!bg-primary/10 hover:!text-primary hover:transition-all'
      } `}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
