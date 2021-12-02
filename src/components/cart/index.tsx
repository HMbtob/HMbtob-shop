import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { cartFetch } from '../../utils/orderUtils';
import { CartHeader } from './CartHeader';
import { CartDefaultAddress } from './CartDefaultAddress';
import { CartShipToKoreaAddress } from './CartShipToKoreaAddress';

export function Cart({ user, exchangeRate }: any) {
  const CartRow = React.lazy(() =>
    import('./CartRow').then((module) => ({
      default: module.CartRow
    }))
  );

  // cart
  const [carts, setCarts] = useState<Array<object>>([]);

  // shipping addresses
  const [shippingAddresses, setShippingAddresses] = useState<any>([]);
  const [type, setType] = useState<any>('Default Address');
  const [add, setAdd] = useState<any>(null);

  useEffect(() => {
    cartFetch(setCarts, user.email);
    db.collection('accounts')
      .doc(user.email)
      .collection('addresses')
      .orderBy('name', 'asc')
      .onSnapshot((snapshot) =>
        setShippingAddresses(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, [user.email]);

  useEffect(() => {
    setAdd(shippingAddresses.find((li: any) => li.data.name === type));
  }, [shippingAddresses, type]);
  return (
    <div
      className="m-auto h-auto lg:h-full w-full lg:w-11/12 mt-12 flex flex-col 
text-center text-sm font-bold text-gray-800 
absolute lg:static bg-white lg:bg-transparent">
      {' '}
      CART LIST
      <CartHeader />
      <div className="h-auto lg:mb-10 overflow-y-auto">
        {carts.map((cart: any, i: number) => (
          <React.Suspense key={i} fallback={<div>Loading...</div>}>
            <CartRow cart={cart} exchangeRate={exchangeRate} user={user} />
          </React.Suspense>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center bg-blue-200">
        <div className="flex flex-row">
          <select onChange={(e) => setType(e.target.value)}>
            {shippingAddresses.map((li: any) => (
              <option key={li.data.name} value={li.data.name}>
                {li.data.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          {add && type !== 'Ship To Korea' ? (
            <CartDefaultAddress user={user} add={add} exchangeRate={exchangeRate} />
          ) : (
            <CartShipToKoreaAddress user={user} add={add} exchangeRate={exchangeRate} />
          )}
        </div>
      </div>
    </div>
  );
}
