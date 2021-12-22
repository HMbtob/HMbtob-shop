import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { MyOrderHeader } from './MyOrderHeader';
import SpecialOrder from './specialorder';

export function MyOrder({ user, exchangeRate }: any) {
  const MyOrderRow = React.lazy(() =>
    import('./MyOrderRow').then((module) => ({
      default: module.MyOrderRow
    }))
  );
  const [myOrders, setMyOrders] = useState<Array<object>>([]);
  // for sort
  const [forSort, setForSort] = useState<any>({
    sortBy: 'createdAt',
    order: false
  });
  const handleSort = (e: any) => {
    try {
      setForSort({
        sortBy: e.target.id || 'createdAt',
        order: !forSort.order
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    db.collection('accounts')
      .doc(user.email)
      .collection('order')
      .orderBy(forSort.sortBy || 'createdAt', forSort.order ? 'asc' : 'desc')
      .onSnapshot((snapshot) =>
        setMyOrders(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, [forSort]);
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full lg:w-11/12 flex-col mt-20">
        <div
          className="w-full text-center my-4 text-gray-800 
       font-semibold text-lg">
          My Orders
        </div>
        <MyOrderHeader handleSort={handleSort} />
        <div>
          {myOrders.map((order: any, i: number) => (
            <React.Suspense key={i} fallback={<div>Loading...</div>}>
              <MyOrderRow order={order} user={user} exchangeRate={exchangeRate} />
            </React.Suspense>
          ))}
        </div>
        <div
          className="w-full text-center my-4 text-gray-800 
       font-semibold text-lg mt-20">
          Special Order
        </div>
        <SpecialOrder user={user} exchangeRate={exchangeRate} />
      </div>
    </div>
  );
}
