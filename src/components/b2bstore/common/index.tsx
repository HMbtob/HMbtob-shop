import { useState } from 'react';
import CommonCategory from './CommonCategory';
import CommonHeader from './CommonHeader';

export function Common() {
  const [cat, setCat] = useState<string>('cd');

  return (
    <div className="flex flex-col h-lg w-11/12 mb-20 ">
      <div className="text-center text-sm font-bold text-gray-800">PRODUCTS</div>
      {/* 컷오프 */}
      <div className="w-full flex justify-end text-xs">
        <select
          className="bg-transparent"
          // value={itemsPerPage}
          // onChange={handleItemsPerPage}
        >
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        개씩 보기
      </div>
      {/* 카테고리 */}
      <CommonCategory cat={cat} setCat={setCat} />
      <CommonHeader />
      <div className="overflow-y-auto	scrollbar-hide">Row</div>
      <div className="flex flex-row w-full items-center justify-center">paging</div>
    </div>
  );
}
