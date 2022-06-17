import React, { useContext, useEffect, useState } from 'react';
import { productsFetch, toSalePriceToLocaleCurrency } from '../../../utils/orderUtils';
import { sortByRelDate } from '../../../utils/searchUtils';
import { CutOff } from '../../cutoff';
import { Paging } from '../../paging';
import CommonCategory from './CommonCategory';
import CommonHeader from './CommonHeader';
import { CSVLink } from 'react-csv';
import { db } from '../../../firebase';
import { AuthContext } from '../../../hooks/useAuth';

export function Common() {
  const CommonRow = React.lazy(() =>
    import('./CommonRow').then((module) => ({
      default: module.CommonRow
    }))
  );

  const [category, setCategory] = useState<any>('cd');
  const [commonProducts, setCommonProducts] = useState<Array<object>>([]);
  const [currentItems, setCurrentItems] = useState<Array<object>>([]);
  const [itemsPerPage, setItemsPerPage] = useState<Number>(20);

  useEffect(() => {
    productsFetch(setCommonProducts, '<=', category);
  }, [category]);

  // 상품 목록 받기
  const authContext = useContext(AuthContext);

  const [csvData, setCsvData] = useState<any>('a');

  useEffect(() => {
    db.collection('products')
      .get()
      .then((res) =>
        setCsvData(
          res.docs.map((doc) => [
            doc.data().title,
            `${toSalePriceToLocaleCurrency(
              doc.data().price,
              authContext?.authState.authUser,
              authContext?.authState.exchangeRate,
              doc.data().category
            )} 원`,
            `${doc.data().stock} 개`
          ])
        )
      );
  }, []);

  return (
    <div className="flex flex-col h-xxlg w-11/12 mb-20 mt-10">
      <div className="text-center text-sm font-bold text-gray-800 flex flex-row items-center justify-center">
        <div>PRODUCTS</div>

        <CSVLink
          data={csvData}
          filename="LIST.csv"
          target="_blank"
          className="bg-gray-600 p-1 rounded-sm text-gray-200 m-2 w-32 text-sm text-center">
          LIST DOWNLOAD
        </CSVLink>
      </div>
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
