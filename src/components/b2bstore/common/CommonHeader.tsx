export default function CommonHeader() {
  return (
    <div
      className="grid grid-cols-20 grid-flow-col 
          text-center bg-gray-800
          text-gray-200 text-sm font-semibold">
      <div className="col-span-2">COVER</div>
      <div className="col-span-3">BARCODE/SKU</div>
      <div className="col-span-7">TITLE</div>
      <div className="col-span-3">RELEASE</div>
      <div className="col-span-3">PRICE</div>
      <div className="col-span-2">EA</div>
    </div>
  );
}
