export function MyOrderHeader() {
  return (
    <div
      className="grid grid-cols-20 grid-flow-col text-center 
     bg-gray-800 text-gray-100 py-1 rounded-none text-xs font-semibold">
      <div className="col-span-2 ">ORDER DATE</div>
      <div className="col-span-2 ">RELEASE</div>
      <div className="col-span-2 ">BARCODE</div>
      <div className="col-span-2 ">SKU</div>
      <div className="col-span-6 ">TITLE</div>
      <div className="col-span-2 ">PRICE</div>
      <div className="col-span-2 ">QTY</div>
      <div className="col-span-2 ">AMOUNT</div>
    </div>
  );
}
