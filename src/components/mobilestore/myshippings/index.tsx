import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { MyShippingsHeader } from './MyShippingsHeader';

export function MyShippings({ user, exchangeRate }: any) {
  const MyShippingsRow = React.lazy(() =>
    import('./MyShippingsRow').then((module) => ({
      default: module.MyShippingsRow
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
    <div className="w-full h-full flex justify-center flex-col mt-10">
      <div
        className="w-full text-center my-4 
text-gray-800 font-semibold">
        Shipped Items{' '}
      </div>
      <MyShippingsHeader handelHiddenAll={handelHiddenAll} />

      {shippings.map((shipping: any, i: number) => (
        <React.Suspense key={i} fallback={<div>Loading...</div>}>
          <MyShippingsRow
            shipping={shipping}
            user={user}
            exchangeRate={exchangeRate}
            hiddenAll={hiddenAll}
          />
        </React.Suspense>
      ))}
    </div>
  );
}
