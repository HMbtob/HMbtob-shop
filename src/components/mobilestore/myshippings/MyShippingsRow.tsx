import { ChevronDownIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { toDate, toLocalCurrency } from '../../../utils/orderUtils';
import HiddenRow from '../../myshipping/HiddenRow';

export function MyShippingsRow({ user, shipping, hiddenAll, exchangeRate }: any) {
  const [orderListInShippings, setOrderListInShippings] = useState<Array<object>>([]);

  const totalQty = orderListInShippings?.reduce((a: any, c: any) => {
    return a + c.data.quan;
  }, 0);

  const [forHidden, setForHidden] = useState<Boolean>(true);
  const handleHidden = () => {
    setForHidden(!forHidden);
  };

  useEffect(() => {
    db.collection('accounts')
      .doc(user.email)
      .collection('shippingsInAccount')
      .doc(shipping.id)
      .collection('orderListInShippings')
      .onSnapshot((snapshot) =>
        setOrderListInShippings(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);
  return (
    <div className="border-b border-r border-l w-full border-gray-500">
      <div
        className="text-sm place-items-center grid 
      grid-cols-5 grid-flow-col text-center border-b 
       py-1 bg-white">
        <div>{toDate(shipping.data.shippedDate.seconds)}</div>
        <div className="flex flex-row items-center">
          {shipping?.data?.trackingNumber?.split(',')?.length > 1 ? (
            <div className="col-span-1">Boxes</div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() =>
                window.open(
                  `https://www.dhl.com/global-en/home/tracking/tracking-express.html?submit=1&tracking-id=${shipping?.data?.trackingNumber}`,
                  '_blank'
                )
              }>
              {shipping.data.trackingNumber}{' '}
            </div>
          )}
          <ChevronDownIcon onClick={() => handleHidden()} className="h-5 cursor-pointer" />
        </div>
        <div>
          {totalQty && totalQty}
          {' ea'}
        </div>
        <div>
          {toLocalCurrency(shipping.data.itemsPrice, user, exchangeRate)} {user.currency}
        </div>
        <div>
          {toLocalCurrency(shipping.data.shippingFee, user, exchangeRate)} {user.currency}
        </div>
        <div>
          {toLocalCurrency(shipping.data.totalAmount, user, exchangeRate)} {user.currency}
        </div>
      </div>
      {forHidden && hiddenAll ? (
        ''
      ) : (
        <HiddenRow shipping={shipping} orderListInShippings={orderListInShippings} />
      )}
    </div>
  );
}
