import React, { useEffect, useState } from 'react';
import { productsFetch } from '../../../utils/orderUtils';
import { sortByCreatedAt } from '../../../utils/searchUtils';
import { PreOrderHeader } from './PreOrderHeader';

export function PreOrder() {
  const PreOrderRow = React.lazy(() =>
    import('./PreOrderRow').then((module) => ({
      default: module.PreOrderRow
    }))
  );
  const [preOrderProducts, setPreOrderProducts] = useState<Array<Object>>([]);

  useEffect(() => {
    productsFetch(setPreOrderProducts, '>');
    return setPreOrderProducts([]);
  }, []);
  return (
    <div className="flex flex-col w-11/12 h-1/4 mb-5">
      <div className="text-center text-sm font-bold text-gray-800">PRE ORDER</div>
      <PreOrderHeader />
      {/* scrollbar-hide */}
      <div className="overflow-y-auto">
        {sortByCreatedAt(preOrderProducts).map((product: any, i: number) => (
          <React.Suspense key={i} fallback={<div>Loading...</div>}>
            <PreOrderRow product={product} />
          </React.Suspense>
        ))}
      </div>
    </div>
  );
}
