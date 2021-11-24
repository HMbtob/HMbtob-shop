import React, { useEffect, useState } from 'react';
import { productsFetch } from '../../../utils/orderUtils';
import CommonCategory from './CommonCategory';
import { CommonCutOff } from './CommonCutOff';
import CommonHeader from './CommonHeader';

export function Common() {
  const CommonRow = React.lazy(() =>
    import('./CommonRow').then((module) => ({
      default: module.CommonRow
    }))
  );

  const [category, setCategory] = useState<string>('cd');
  const [commonProducts, setCommonProducts] = useState<Array<object>>([]);

  useEffect(() => {
    productsFetch(setCommonProducts, '<=', category);
  }, []);

  return (
    <div className="flex flex-col h-lg w-11/12 mb-20 ">
      <div className="text-center text-sm font-bold text-gray-800">PRODUCTS</div>
      {/* 컷오프 */}
      <CommonCutOff />
      {/* 카테고리 */}
      <CommonCategory category={category} setCategory={setCategory} />
      <CommonHeader />
      <div className="overflow-y-auto	scrollbar-hide">
        {commonProducts.map((product: any, i: number) => (
          <React.Suspense key={i} fallback={<div>Loading...</div>}>
            <CommonRow product={product} />
          </React.Suspense>
        ))}
      </div>
      <div className="flex flex-row w-full items-center justify-center">paging</div>
    </div>
  );
}
