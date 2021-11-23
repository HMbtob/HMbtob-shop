export function PreOrderHeader() {
  return (
    <div
      className="grid grid-cols-20 text-center bg-gray-800 p-1 
    text-gray-200 text-xs font-semibold">
      <div>COVER</div>
      <div className="col-span-2">BARCODE</div>
      <div className="col-span-2">SKU</div>
      <div className="col-span-5">TITLE</div>
      <div className="col-span-2">RELEASE</div>
      <div className="col-span-2">DEADLINE</div>
      <div className="col-span-2">PRICE</div>
      <div className="col-span-2">SALE</div>
      <div className="col-span-2">EA</div>
    </div>
  );
}
