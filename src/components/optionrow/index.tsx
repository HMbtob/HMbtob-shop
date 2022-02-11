import { useContext } from 'react';
import { AuthContext } from '../../hooks/useAuth';
import { toLocalCurrency, toSalePriceToLocaleCurrency } from '../../utils/orderUtils';
import { AddCart } from '../addCart';

export function OptionRow({ option, product, user, exchangeRate }: any) {
  const authContext = useContext(AuthContext);

  return (
    <div className="w-full border-t text-left grid grid-cols-20 items-center">
      <div className="col-span-6"></div>
      <div className="col-span-6">{option.data.optionName}</div>
      <div className="col-span-4"></div>
      <div className="col-span-2">
        <div className="line-through text-sm">
          {toLocalCurrency(
            option.data.optionPrice,
            authContext?.authState.authUser,
            authContext?.authState.exchangeRate
          )}{' '}
          {user?.currency}
        </div>
        <div className="font-semibold text-sm">
          {toSalePriceToLocaleCurrency(
            option.data.optionPrice,
            authContext?.authState.authUser,
            authContext?.authState.exchangeRate,
            product.data.category
          )}{' '}
          {user?.currency}
        </div>
      </div>
      <div className="col-span-2">
        <AddCart product={product} user={user} exchangeRate={exchangeRate} option={option} />
      </div>
    </div>
  );
}
