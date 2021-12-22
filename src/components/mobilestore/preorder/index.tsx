import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { productsFetch } from '../../../utils/orderUtils';
import { sortByCreatedAt } from '../../../utils/searchUtils';
export function PreOrder({ togglePreOrder, handleTogglePreOrder }: any) {
  const CommonRow = React.lazy(() =>
    import('../common/CommonRow').then((module) => ({
      default: module.CommonRow
    }))
  );

  const [preOrderProducts, setPreOrderProducts] = useState<Array<Object>>([]);
  useEffect(() => {
    productsFetch(setPreOrderProducts, '>');
    // return setPreOrderProducts([]);
  }, []);

  return (
    <div className="flex flex-col items-center bg-white border-b border-gray-500 w-full">
      {' '}
      <div
        onClick={() => handleTogglePreOrder()}
        className="flex flex-row items-center justify-center w-full bg-blue-900 text-white">
        <div className="text-md py-1 font-semibold">PRE ORDER</div>
        <div>
          {togglePreOrder ? (
            <ChevronDownIcon className="h-5" />
          ) : (
            <ChevronRightIcon className="h-5" />
          )}
        </div>
      </div>
      <div className="overflow-y-auto">
        {togglePreOrder &&
          sortByCreatedAt(preOrderProducts).map((product: any, i: number) => (
            <React.Suspense key={i} fallback={<div>Loading...</div>}>
              <CommonRow product={product} />
            </React.Suspense>
          ))}
      </div>
    </div>
  );
}
