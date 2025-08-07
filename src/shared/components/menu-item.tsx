import { ActiveLink } from ".";

interface MenuItemProps {
    url: string;
    title: string;
    icon?: React.ReactNode
    onlyIcon?: boolean;
}

const MenuItem = ({ url = "/", title = "", icon, onlyIcon = false }: MenuItemProps) => {
    return (
        <li>
            <ActiveLink
                url={url}
            >
                {icon}
                {!onlyIcon && title}
            </ActiveLink>
        </li>
    );
};

export default MenuItem;