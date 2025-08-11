interface ICourseGridProps {
  children: React.ReactNode;
}
const CourseGrid = ({ children }: ICourseGridProps) => {
  return (
    <div className="course-slider mt-6 grid gap-4 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3 3xl:grid-cols-4">
      {children}
    </div>
  );
};

export default CourseGrid;
