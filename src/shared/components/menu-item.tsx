import { ActiveLink } from '.';

interface MenuItemProps {
  url: string;
  title: string;
  icon?: React.ReactNode;
  onlyIcon?: boolean;
}

const MenuItem = ({
  icon,
  onlyIcon = false,
  title = '',
  url = '/',
}: MenuItemProps) => {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {!onlyIcon && title}
      </ActiveLink>
    </li>
  );
};

export default MenuItem;
