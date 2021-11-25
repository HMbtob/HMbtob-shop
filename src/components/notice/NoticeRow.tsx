export function NoticeRow() {
  return (
    <div
      className="grid grid-cols-10 place-items-center text-center 
        text-xs border-r border-b border-l py-1 cursor-pointer bg-white">
      <div className="col-span-1">index</div>
      <div className="col-span-7">title</div>
      <div className="col-span-2">date</div>
    </div>
  );
}
