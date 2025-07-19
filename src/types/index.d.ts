interface IActiveLinkProps {
    url: string;
    children: React.ReactNode;
};

interface IMenuItems {
    url: string;
    title: string;
    icon?: React.ReactNode
}

export { IActiveLinkProps, IMenuItems };