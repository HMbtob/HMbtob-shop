import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { MyOrderHeader } from './MyOrderHeader';

export function MyOrder({ user, exchangeRate }: any) {
  const MyOrderRow = React.lazy(() =>
    import('./MyOrderRow').then((module) => ({
      default: module.MyOrderRow
    }))
  );
  const [myOrders, setMyOrders] = useState<Array<object>>([]);

  useEffect(() => {
    db.collection('accounts')
      .doc(user.email)
      .collection('order')
      .onSnapshot((snapshot) =>
        setMyOrders(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full lg:w-11/12 flex-col mt-8 lg:mt-20">
        <div
          className="w-full text-center my-4 text-gray-800 
       font-semibold text-lg">
          My Orders
        </div>
        <MyOrderHeader />
        <div>
          {myOrders.map((order: any, i: number) => (
            <React.Suspense key={i} fallback={<div>Loading...</div>}>
              <MyOrderRow order={order} user={user} exchangeRate={exchangeRate} />
            </React.Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}
