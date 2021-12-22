import { SwitchVerticalIcon } from '@heroicons/react/outline';

export function MyOrdersHeader({ handleSort }: any) {
  return (
    <div
      className="grid grid-cols-12 grid-flow-col text-center 
 bg-blue-900 text-gray-100 py-1 rounded-none text-sm font-extrabold">
      <div
        className="col-span-2 flex flex-row items-center justify-center cursor-pointer"
        id="createdAt"
        onClick={(e) => handleSort(e)}>
        DATE <SwitchVerticalIcon id="createdAt" className="h-4 ml-1" />
      </div>
      <div
        onClick={(e) => handleSort(e)}
        className="col-span-6 flex flex-row items-center justify-center cursor-pointer"
        id="title">
        TITLE <SwitchVerticalIcon id="title" className="h-4 ml-1" />
      </div>
      <div className="col-span-2 ">PRICE</div>
      <div className="col-span-2 ">QTY</div>
    </div>
  );
}
