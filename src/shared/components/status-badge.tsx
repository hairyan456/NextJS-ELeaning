import { cn } from '@/lib/utils';
import { commonClassName } from '@/shared/constants';

interface StatusBadgeProps {
  item?: {
    className?: string;
    title: string;
  };
  onClick?: () => void;
}

const StatusBadge = ({ item, onClick }: StatusBadgeProps) => {
  return (
    <span
      className={cn(commonClassName.status, item?.className)}
      onClick={onClick}
    >
      {item?.title}
    </span>
  );
};

export default StatusBadge;
