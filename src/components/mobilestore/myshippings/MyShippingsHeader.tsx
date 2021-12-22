import { ChevronDownIcon } from '@heroicons/react/outline';

export function MyShippingsHeader({ handelHiddenAll }: any) {
  return (
    <div
      className="grid grid-cols-5 grid-flow-col text-center font-semibold
       bg-blue-900 text-gray-100 py-1 rounded-sm text-xs items-center">
      <div className="">Date</div>
      <div className="flex flex-row items-center justify-center">
        <div>Tracking No.</div>
        <div>
          <ChevronDownIcon className="h-5 cursor-pointer" onClick={() => handelHiddenAll()} />
        </div>
      </div>
      <div className="">EA</div>

      <div className="">Item Price</div>

      <div className="">Shipping Fee</div>
      <div className="">Total Amount</div>
    </div>
  );
}
