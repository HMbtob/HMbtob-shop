import { useContext } from 'react';
import { AuthContext } from '../../../hooks/useAuth';
import { toDate, toLocalCurrency, toSalePriceToLocaleCurrency } from '../../../utils/orderUtils';
import { AddCart } from '../../addCart';

export function CommonRow({ product }: any) {
  const authContext = useContext(AuthContext);
  const user: any = authContext?.authState.authUser;
  const exchangeRate: any = authContext?.authState.exchangeRate;

  return (
    <div
      id={product.id}
      className="grid  grid-cols-20 place-items-center text-center 
            text-sm border-b p-1 border-l border-r bg-white relative">
      <img
        className="col-span-2 h-14 w-14 bg-contain bg-center bg-no-repeat rounded-sm"
        src={product.data.thumbNail}
        alt="thumbNail"
      />{' '}
      <div className="col-span-3 z-10 h-full flex flex-col items-center">
        <div className="h-full items-center flex">{product.data.barcode}</div>
        <div className="h-full items-center flex">{product.data.sku}</div>
      </div>
      <div className="col-span-7 z-10">{product.data.title}</div>
      <div className="col-span-3 z-10">{toDate(product.data.relDate.seconds)}</div>
      <div className="col-span-3 z-10 ">
        <div className="line-through">
          {toLocalCurrency(
            product.data.price,
            authContext?.authState.authUser,
            authContext?.authState.exchangeRate
          )}{' '}
          {user?.currency}
        </div>
        <div className="font-semibold">
          {toSalePriceToLocaleCurrency(
            product.data.price,
            authContext?.authState.authUser,
            authContext?.authState.exchangeRate,
            product.data.category
          )}{' '}
          {user?.currency}
        </div>
      </div>
      <div className="col-span-2">
        <AddCart product={product} user={user} exchangeRate={exchangeRate} />
      </div>
    </div>
  );
}
