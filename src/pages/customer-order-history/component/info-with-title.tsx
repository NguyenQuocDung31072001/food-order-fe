export const InfoWithTitle: React.FC<{ title: string; value: string }> = ({ title, value }) => {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 font-normal text-[12px]">{title}</span>
      <span className="text-black">{value}</span>
    </div>
  );
};
