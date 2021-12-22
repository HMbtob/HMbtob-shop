import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
// import SpecialOrder from '../../myorder/specialorder';
import { MyOrdersHeader } from './MyOrdersHeader';

export function MyOrders({ user, exchangeRate }: any) {
  const MyOrdersRow = React.lazy(() =>
    import('./MyOrdersRow').then((module) => ({
      default: module.MyOrdersRow
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
    <div className="w-full h-full flex flex-col justify-center mt-10">
      <div className="w-full text-center my-4 text-gray-800 font-semibold text-lg">My Orders</div>
      <MyOrdersHeader handleSort={handleSort} />
      <div>
        {myOrders.map((order: any, i: number) => (
          <React.Suspense key={i} fallback={<div>Loading...</div>}>
            <MyOrdersRow order={order} user={user} exchangeRate={exchangeRate} />
          </React.Suspense>
        ))}
      </div>
      {/* <div
        className="w-full text-center my-4 text-gray-800 
       font-semibold text-lg mt-20">
        Special Order
      </div>
      <SpecialOrder user={user} exchangeRate={exchangeRate} /> */}
    </div>
  );
}
