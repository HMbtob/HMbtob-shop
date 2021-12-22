import React, { useEffect, useState } from 'react';
import { filterByQuery, mobileFetch } from '../../../utils/searchUtils';
import { CutOff } from '../../cutoff';
import { Paging } from '../../paging';

export function Searched({ query }: any) {
  const CommonRow = React.lazy(() =>
    import('../common/CommonRow').then((module) => ({
      default: module.CommonRow
    }))
  );

  const [loading, setLoading] = useState<Boolean>(true);
  const [itemsPerPage, setItemsPerPage] = useState<Number>(20);
  const [searchedProduct, setSearchedProduct] = useState<Array<Object>>([]);
  const [filteredProduct, setFilteredProduct] = useState<Array<Object>>([]);
  const [currentItems, setCurrentItems] = useState<Array<object>>([]);

  useEffect(() => {
    setLoading(true);
    mobileFetch(setSearchedProduct, setLoading);
    return setSearchedProduct([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    filterByQuery(searchedProduct, query, setLoading, setFilteredProduct);
  }, [searchedProduct]);

  return (
    <div className="flex flex-col items-center bg-white border-b border-gray-500 w-full mb-16">
      <div className="text-md py-1 font-semibold">SEARCH</div>
      <CutOff setItemsPerPage={setItemsPerPage} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
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
              items={filteredProduct}
              setCurrentItems={setCurrentItems}
            />
          </div>
        </>
      )}
    </div>
  );
}
