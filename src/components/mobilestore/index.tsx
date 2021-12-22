import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { Cart } from '../cart';
import { Common } from './common';
import { OrderButton } from './orderbutton';
import { PreOrder } from './preorder';
import { Search } from './search';
import { Searched } from './searched';
export function MobileStore({ user, exchangeRate }: any) {
  const [query, setQuery] = useState<String>('');

  // handle common
  const [toggleCommon, setToggleCommon] = useState<Boolean>(false);
  const handleToggleCommon = () => {
    setToggleCommon(!toggleCommon);
  };

  // handle preorder
  const [togglePreOrder, setTogglePreOrder] = useState<Boolean>(false);
  const handleTogglePreOrder = () => {
    setTogglePreOrder(!togglePreOrder);
  };

  // handle cart
  const [cart, setCart] = useState<Boolean>(false);
  const handleCart = () => {
    setQuery('');
    setToggleCommon(false);
    setTogglePreOrder(false);
    setCart(!cart);
  };
  const [carts, setCarts] = useState<Array<Object>>([]);

  useEffect(() => {
    db.collection('accounts')
      .doc(user.email)
      .collection('cart')
      .onSnapshot((snapshot) =>
        setCarts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, [user]);
  return (
    <div className="bg-gray-100 h-auto min-h-screen flex-col flex items-center">
      <Search setQuery={setQuery} user={user} handleCart={handleCart} carts={carts.length} />
      {cart && <Cart user={user} exchangeRate={exchangeRate} />}
      {query.length > 0 ? (
        <Searched query={query} />
      ) : (
        <>
          <PreOrder
            user={user}
            togglePreOrder={togglePreOrder}
            handleTogglePreOrder={handleTogglePreOrder}
          />
          <Common user={user} toggleCommon={toggleCommon} handleToggleCommon={handleToggleCommon} />
        </>
      )}
      {!cart && <OrderButton carts={carts.length} handleCart={handleCart} />}
    </div>
  );
}
