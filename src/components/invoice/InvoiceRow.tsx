export function InvoiceRow({ list, index }: any) {
  return (
    <div
      className="grid grid-cols-28 border-b border-black
           border-r border-l text-xs items-center">
      <div className="col-span-1 text-center border-r border-black p-1">{index + 1}</div>
      <div className="col-span-16 text-left  border-r border-black p-1">{list.data.title}</div>
      <div className="col-span-3 text-center   border-black p-1 w-auto">{list.data.option}</div>
      <div
        className="col-span-2  border-r border-l 
  border-black p-1 flex flex-row">
        <div className="text-right  w-full ">{list.data.quan.toLocaleString()}&nbsp; EA</div>
      </div>
      <div
        className="col-span-3   border-r border-black p-1 
  flex flex-row items-center  ">
        <div className="w-full text-right">
          {list.data.price.toLocaleString()}&nbsp;
          {list.data.currency}
        </div>
      </div>
      <div
        className="col-span-3 p-1 flex 
  flex-row items-center justify-center">
        <div className="text-right w-full">
          {list.data.totalPrice.toLocaleString()}&nbsp;
          {list.data.currency}
        </div>
      </div>
    </div>
  );
}
