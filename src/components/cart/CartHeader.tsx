export function CartHeader() {
  return (
    <div
      className="grid grid-cols-7 place-items-center text-center 
        text-xs bg-blue-900 lg:bg-gray-800 py-1 text-gray-200">
      <div className="col-span-3">TITLE</div>
      <div className="col-span-2">QUAN</div>
      <div className="col-span-1">PRICE</div>
      <div className="col-span-1">TOTAL</div>
    </div>
  );
}
