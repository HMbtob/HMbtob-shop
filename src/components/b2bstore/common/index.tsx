import React, { useEffect, useState } from 'react';
import { productsFetch } from '../../../utils/orderUtils';
import { sortByRelDate } from '../../../utils/searchUtils';
import { CutOff } from '../../cutoff';
import { Paging } from '../../paging';
import CommonCategory from './CommonCategory';
import CommonHeader from './CommonHeader';

export function Common() {
  const CommonRow = React.lazy(() =>
    import('./CommonRow').then((module) => ({
      default: module.CommonRow
    }))
  );

  const [category, setCategory] = useState<string>('cd');
  const [commonProducts, setCommonProducts] = useState<Array<object>>([]);
  const [currentItems, setCurrentItems] = useState<Array<object>>([]);
  const [itemsPerPage, setItemsPerPage] = useState<Number>(20);

  useEffect(() => {
    productsFetch(setCommonProducts, '<=', category);
  }, [category]);

  return (
    <div className="flex flex-col h-xxlg w-11/12 mb-20 mt-10">
      <div className="text-center text-sm font-bold text-gray-800">PRODUCTS</div>
      {/* 컷오프 */}
      <CutOff setItemsPerPage={setItemsPerPage} />
      {/* 카테고리 */}
      <CommonCategory category={category} setCategory={setCategory} from="pc" />
      <CommonHeader />
      {/* scrollbar-hide */}
      <div className="overflow-y-auto">
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
          items={sortByRelDate(commonProducts)}
          setCurrentItems={setCurrentItems}
        />
      </div>
    </div>
  );
}
