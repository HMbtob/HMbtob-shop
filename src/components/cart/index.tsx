import React, { useEffect, useState } from 'react';
import { cartFetch } from '../../utils/orderUtils';
import CartHeader from './CartHeader';

export function Cart({ user, exchangeRate }: any) {
  const CartRow = React.lazy(() =>
    import('./CartRow').then((module) => ({
      default: module.CartRow
    }))
  );

  const [carts, setCarts] = useState<Array<object>>([]);

  useEffect(() => {
    cartFetch(setCarts, user.email);
  }, []);
  return (
    <div
      className="m-auto h-auto lg:h-full w-full lg:w-11/12 mt-12 flex flex-col 
text-center text-sm font-bold text-gray-800 
absolute lg:static bg-white lg:bg-transparent">
      {' '}
      CART LIST
      <CartHeader />
      <div className="h-2/3 lg:mb-10 overflow-y-auto">
        {carts.map((cart: any, i: number) => (
          <React.Suspense key={i} fallback={<div>Loading...</div>}>
            <CartRow cart={cart} exchangeRate={exchangeRate} user={user} />
          </React.Suspense>
        ))}
      </div>
    </div>
  );
}
