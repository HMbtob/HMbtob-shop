import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { MyShippingHeader } from './MyShippingHeader';

export function MyShipping({ user, exchangeRate }: any) {
  const MyShippingRow = React.lazy(() =>
    import('./MyShippingRow').then((module) => ({
      default: module.MyShippingRow
    }))
  );

  const [shippings, setShippings] = useState<Array<object>>([]);
  const [hiddenAll, setHiddenAll] = useState<Boolean>(true);
  const handelHiddenAll = () => {
    setHiddenAll(!hiddenAll);
  };
  useEffect(() => {
    db.collection('accounts')
      .doc(user.email)
      .collection('shippingsInAccount')
      .onSnapshot((snapshot) =>
        setShippings(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-11/12 flex-col mt-20">
        <div
          className="w-full text-center my-4 
        text-gray-800 font-semibold">
          Shipped Items{' '}
        </div>
        <MyShippingHeader handelHiddenAll={handelHiddenAll} />
        <div>
          {shippings.map((shipping: any, i: number) => (
            <React.Suspense key={i} fallback={<div>Loading...</div>}>
              <MyShippingRow
                shipping={shipping}
                user={user}
                exchangeRate={exchangeRate}
                hiddenAll={hiddenAll}
              />
            </React.Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}
