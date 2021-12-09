import { SwitchVerticalIcon } from '@heroicons/react/outline';

export function MyOrderHeader({ handleSort }: any) {
  return (
    <div
      className="grid grid-cols-28 grid-flow-col text-center 
     bg-gray-800 text-gray-100 py-1 rounded-none text-sm font-semibold">
      <div
        className="col-span-2 flex flex-row items-center justify-center cursor-pointer"
        id="addName"
        onClick={(e) => handleSort(e)}>
        ADDRESS
        <SwitchVerticalIcon id="addName" className="h-4 ml-1" />
      </div>
      <div
        className="col-span-2 flex flex-row items-center justify-center cursor-pointer"
        id="createdAt"
        onClick={(e) => handleSort(e)}>
        ORDER DATE <SwitchVerticalIcon id="createdAt" className="h-4 ml-1" />
      </div>
      <div
        className="col-span-2 flex flex-row items-center justify-center cursor-pointer"
        id="relDate"
        onClick={(e) => handleSort(e)}>
        RELEASE <SwitchVerticalIcon id="relDate" className="h-4 ml-1" />
      </div>
      <div className="col-span-3 ">BARCODE</div>
      <div className="col-span-3 ">SKU</div>
      <div
        onClick={(e) => handleSort(e)}
        className="col-span-7 flex flex-row items-center justify-center cursor-pointer"
        id="title">
        TITLE <SwitchVerticalIcon id="title" className="h-4 ml-1" />
      </div>
      <div className="col-span-2 ">PRICE</div>
      <div className="col-span-2 ">QTY</div>
      <div className="col-span-2 ">AMOUNT</div>
      <div className="col-span-3 ">MEMO</div>
    </div>
  );
}
