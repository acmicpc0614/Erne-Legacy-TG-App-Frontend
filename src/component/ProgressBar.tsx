export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full px-6 flex items-center justify-center">
      <div className="w-full h-5 border-[#E39431] bg-[#2F2F2F] border-[1px] rounded-full flex items-center">
        <div
          className="bg-[#E39431] h-3 rounded-full mx-1"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
