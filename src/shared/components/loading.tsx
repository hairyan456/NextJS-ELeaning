import { cn } from '../utils';

interface ILoadingProps {
  className?: string;
}
const Loading = ({ className }: ILoadingProps) => {
  return (
    <div
      className={cn('flex size-full items-center justify-center', className)}
    >
      <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
};

export default Loading;
