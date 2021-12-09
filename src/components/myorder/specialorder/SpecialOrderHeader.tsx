export function SpecialOrderHeader() {
  return (
    <div
      className="grid grid-cols-20 grid-flow-col text-center 
     bg-gray-800 text-gray-100 py-1 rounded-none text-xs font-semibold">
      <div className="col-span-1 "></div>
      <div className="col-span-2 ">Title</div>
      <div className="col-span-5 ">Title</div>
      <div className="col-span-3 ">Item URL</div>
      <div className="col-span-3 ">Thumb Nail URL</div>
      <div className="col-span-3 ">Price</div>
      <div className="col-span-3 ">Qty</div>
    </div>
  );
}
