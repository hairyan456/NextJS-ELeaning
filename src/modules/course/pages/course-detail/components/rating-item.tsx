interface IRatingItemProps {
  rating: string;
}
const RatingItem = ({ rating }: IRatingItemProps) => {
  return (
    <div className="rounded-full bg-gradient-to-tr from-primary to-secondary p-2 px-4 text-sm font-medium text-white">
      {rating}
    </div>
  );
};

export default RatingItem;
