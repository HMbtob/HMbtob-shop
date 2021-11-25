export function NoticeHeader() {
  return (
    <div
      className="grid grid-cols-10 grid-flow-col text-center 
      bg-gray-800 text-gray-200 text-xs font-semibold">
      <div className="col-span-1">No.</div>
      <div className="col-span-7">TITLE</div>
      <div className="col-span-2">DATE</div>
    </div>
  );
}
