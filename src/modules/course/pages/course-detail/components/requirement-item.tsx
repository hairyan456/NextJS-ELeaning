import { IconCheck } from '@/shared/components/icons';

interface IRequirementItemProps {
  title: string;
}

const RequirementItem = ({ title }: IRequirementItemProps) => {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="flex size-4 shrink-0 items-center justify-center rounded bg-primary text-white">
        <IconCheck className="size-3 font-semibold" />
      </span>
      <span>{title}</span>
    </div>
  );
};

export default RequirementItem;
