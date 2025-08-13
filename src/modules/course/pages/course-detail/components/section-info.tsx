interface ISectionInfoProps {
  title: string;
  children: React.ReactNode;
}

function SectionInfo({ children, title }: ISectionInfoProps) {
  return (
    <div className="rounded-lg bg-white p-5">
      <h4 className="text-sm font-normal text-slate-400">{title}</h4>
      <h3 className="font-bold">{children}</h3>
    </div>
  );
}
export default SectionInfo;
