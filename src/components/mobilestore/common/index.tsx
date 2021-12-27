import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';
import CommonCategory from '../../b2bstore/common/CommonCategory';
import { productsFetch } from '../../../utils/orderUtils';
import { CutOff } from '../../cutoff';
import { Paging } from '../../paging';
import { sortByRelDate } from '../../../utils/searchUtils';
export function Common({ handleToggleCommon, toggleCommon, user }: any) {
  const CommonRow = React.lazy(() =>
    import('./CommonRow').then((module) => ({
      default: module.CommonRow
    }))
  );
  // const today = new Date();
  const [category, setCategory] = useState<string>('cd');
  const [commonProducts, setCommonProducts] = useState<Array<object>>([]);
  const [currentItems, setCurrentItems] = useState<Array<object>>([]);
  const [itemsPerPage, setItemsPerPage] = useState<Number>(20);

  useEffect(() => {
    productsFetch(setCommonProducts, '<=', category);
    return setCommonProducts([]);
  }, [category]);

  return (
    <div className="flex flex-col items-center bg-white border-b border-gray-500 w-full mb-16">
      <div
        onClick={() => handleToggleCommon()}
        className="flex flex-row items-center justify-center w-full bg-blue-900 text-white">
        <div className="text-md py-1 font-semibold">COMMON</div>
        <div>
          {toggleCommon ? (
            <ChevronDownIcon className="h-5" />
          ) : (
            <ChevronRightIcon className="h-5" />
          )}
        </div>
      </div>
      {toggleCommon && (
        <>
          <div className="flex flex-col items-center w-full justify-center">
            <CutOff setItemsPerPage={setItemsPerPage} />
            <CommonCategory category={category} setCategory={setCategory} from="mobile" />
          </div>
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
        </>
      )}
    </div>
  );
}
