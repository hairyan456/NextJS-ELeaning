import { MenuItem, Sidebar } from '@/shared/components';
import { menuItems } from '@/shared/constants';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper block h-screen pb-20 lg:grid lg:grid-cols-[300px,minmax(0,1fr)] lg:pb-0">
      <Sidebar />
      <ul className="bgDarkMode borderDarkMode fixed bottom-0 left-0 flex h-16 w-full justify-center gap-5 border-t p-3 lg:hidden">
        {menuItems?.map((item) => (
          <MenuItem
            key={item.url}
            icon={item.icon}
            onlyIcon={true}
            title={item.title}
            url={item.url}
          />
        ))}
      </ul>
      <div className="hidden lg:block" />
      <main className="p-5">{children}</main>
    </div>
  );
};

export default layout;
