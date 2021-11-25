import React, { useEffect, useState } from 'react';
import { productsFetch } from '../../../utils/orderUtils';
import { Paging } from '../../paging';
import CommonCategory from './CommonCategory';
import { CommonCutOff } from './CommonCutOff';
import CommonHeader from './CommonHeader';

export function Common() {
  const [category, setCategory] = useState<string>('cd');

  const [commonProducts, setCommonProducts] = useState<Array<object>>([]);
  const [currentItems, setCurrentItems] = useState<Array<object>>([]);

  const CommonRow = React.lazy(() =>
    import('./CommonRow').then((module) => ({
      default: module.CommonRow
    }))
  );

  const [itemsPerPage, setItemsPerPage] = useState<Number>(20);
  useEffect(() => {
    productsFetch(setCommonProducts, '<=', category);
  }, [category]);

  return (
    <div className="flex flex-col h-xlg w-11/12 mb-20 ">
      <div className="text-center text-sm font-bold text-gray-800">PRODUCTS</div>
      {/* 컷오프 */}
      <CommonCutOff setItemsPerPage={setItemsPerPage} />
      {/* 카테고리 */}
      <CommonCategory category={category} setCategory={setCategory} />
      <CommonHeader />
      <div className="overflow-y-auto	scrollbar-hide">
        {/* Row */}
        {currentItems.map((product: any, i: number) => (
          <React.Suspense key={i} fallback={<div>Loading...</div>}>
            <CommonRow product={product} />
          </React.Suspense>
        ))}
      </div>
      <div className="flex flex-row w-full items-center justfy-center">
        <Paging
          itemsPerPage={itemsPerPage}
          items={commonProducts}
          setCurrentItems={setCurrentItems}
        />
      </div>
    </div>
  );
}
