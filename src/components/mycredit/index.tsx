import React from 'react';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { CutOff } from '../cutoff';
import { Paging } from '../paging';
import { CreditHeader } from './CreditHeader';

export function MyCredit({ authContext }: any) {
  const CreditRow = React.lazy(() =>
    import('./CreditRow').then((module) => ({
      default: module.CreditRow
    }))
  );

  const [credits, setCredits] = useState<Array<object>>([]);
  const [currentItems, setCurrentItems] = useState<Array<object>>([]);
  const [itemsPerPage, setItemsPerPage] = useState<Number>(20);

  useEffect(() => {
    const unsub1 = db
      .collection('accounts')
      .doc(authContext?.authState?.authUser?.email)
      .collection('credit')
      .orderBy('createdAt', 'asc')
      .onSnapshot((snapshot) =>
        setCredits(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );

    return () => {
      unsub1();
    };
  }, [authContext]);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full lg:w-11/12 flex-col mt-20">
        <div
          className="w-full text-center my-4 text-gray-800 
   font-semibold text-lg">
          My Credit
        </div>
        <CutOff setItemsPerPage={setItemsPerPage} />
        <CreditHeader />
        {currentItems
          .reduce((a: any, c: any, i: any) => {
            let balance =
              i === 0 ? c.data.balance || 0 : a[i - 1].data.balance + c.data.plus - c.data.minus;
            c.data.balance = balance;
            a.push(c);
            return a;
          }, [])
          .map((credit: any, i: any) => (
            <React.Suspense key={i} fallback={<div>Loading...</div>}>
              <CreditRow credit={credit} />
            </React.Suspense>
          ))}
        <Paging itemsPerPage={itemsPerPage} items={credits} setCurrentItems={setCurrentItems} />
      </div>
    </div>
  );
}
