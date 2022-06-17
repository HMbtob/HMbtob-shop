import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { productsFetch, toSalePriceToLocaleCurrency } from '../../../utils/orderUtils';
import { sortByCreatedAt } from '../../../utils/searchUtils';
import { PreOrderHeader } from './PreOrderHeader';
import { CSVLink } from 'react-csv';
import { AuthContext } from '../../../hooks/useAuth';

export function PreOrder() {
  const PreOrderRow = React.lazy(() =>
    import('./PreOrderRow').then((module) => ({
      default: module.PreOrderRow
    }))
  );
  const [preOrderProducts, setPreOrderProducts] = useState<Array<Object>>([]);

  useEffect(() => {
    productsFetch(setPreOrderProducts, '>');
    // return setPreOrderProducts([]);
  }, []);

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
    <div className="flex flex-col w-11/12 h-xlg mb-5">
      <div className="text-center text-sm font-bold text-gray-800 flex flex-row items-center justify-center">
        <div>PRE ORDER</div>
        <CSVLink
          data={csvData}
          filename="LIST.csv"
          target="_blank"
          className="bg-gray-600 p-1 rounded-sm text-gray-200 m-2 w-32 text-sm text-center">
          LIST DOWNLOAD
        </CSVLink>
      </div>
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
