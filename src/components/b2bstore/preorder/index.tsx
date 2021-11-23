import { PreOrderHeader } from './PreOrderHeader';

export function PreOrder() {
  return (
    <div className="flex flex-col w-11/12 h-64 mb-5">
      <div className="text-center text-sm font-bold text-gray-800">PRE ORDER</div>
      <PreOrderHeader />
      <div className="overflow-y-auto	scrollbar-hide">Row</div>
    </div>
  );
}
