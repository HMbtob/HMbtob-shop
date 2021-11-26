import React, { useEffect, useState } from 'react';
import { productFetch } from '../../../utils/searchUtils';
import { SearchedHeader } from './SearchedHeader';
import { Paging } from '../../paging';
import { CutOff } from '../../cutoff';

export default function Searched({ query }: any) {
  const SearchedRow = React.lazy(() =>
    import('./SearchedRow').then((module) => ({
      default: module.SearchedRow
    }))
  );

  const [loading, setLoading] = useState<Boolean>(true);
  const [itemsPerPage, setItemsPerPage] = useState<Number>(20);
  const [searchedProduct, setSearchedProduct] = useState<Array<Object>>([]);
  const [currentItems, setCurrentItems] = useState<Array<object>>([]);

  useEffect(() => {
    setLoading(true);
    productFetch(setSearchedProduct, query, setLoading);
    return setSearchedProduct([]);
  }, [query]);

  return (
    <div className="flex flex-col h-xxlg w-11/12 mb-20">
      <div className="text-center text-sm font-bold text-gray-800">SEARCHED ITEMS</div>
      <CutOff setItemsPerPage={setItemsPerPage} />
      <SearchedHeader />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="overflow-y-auto">
            {currentItems.map((product: any, i: number) => (
              <React.Suspense key={i} fallback={<div>Loading...</div>}>
                <SearchedRow product={product} />
              </React.Suspense>
            ))}
          </div>
          <div className="flex flex-row w-full items-center justfy-center">
            <Paging
              itemsPerPage={itemsPerPage}
              items={searchedProduct}
              setCurrentItems={setCurrentItems}
            />
          </div>
        </>
      )}
    </div>
  );
}
