import { useContext, useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { AuthContext } from '../../../hooks/useAuth';
import {
  preOrderLimitTime,
  toDate,
  toLocalCurrency,
  toSalePriceToLocaleCurrency
} from '../../../utils/orderUtils';
import { AddCart } from '../../addCart';
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from '@heroicons/react/solid';
import { OptionRow } from '../../optionrow';

export function SearchedRow({ product }: any) {
  const authContext = useContext(AuthContext);
  const user: any = authContext?.authState.authUser;
  const exchangeRate: any = authContext?.authState.exchangeRate;
  const { day, hour } = preOrderLimitTime(product.data.preOrderDeadline.seconds);
  const [options, setOptions] = useState<any>(null);
  const [hiddenOption, setHiddenOption] = useState<boolean>(false);

  const handleOption = () => {
    setHiddenOption(!hiddenOption);
  };
  useEffect(() => {
    product.data.optioned &&
      db
        .collection('products')
        .doc(product.id)
        .collection('options')
        .get()
        .then((snapshot) =>
          setOptions(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
        );
  }, []);

  return (
    <div className="border-b-4 p-1 border-l border-r">
      <div
        id={product.id}
        className="grid  grid-cols-20 place-items-center text-center 
text-sm  bg-white relative">
        <img
          className="col-span-2 h-14 w-14 bg-contain bg-center bg-no-repeat rounded-sm"
          src={product.data.thumbNail}
          alt="thumbNail"
        />{' '}
        <div className="col-span-4 z-10 h-full flex flex-col items-center">
          <div className="h-full items-center flex">{product.data.barcode}</div>
          <div className="h-full items-center flex">{product.data.sku}</div>
        </div>
        <div className="col-span-6 z-10 w-full">
          <div className="text-left">{product.data.title}</div>
        </div>
        <div className="col-span-2 z-10">{toDate(product.data.relDate.seconds)}</div>
        <div className="col-span-2 z-10">
          {day > 0 ? (
            <>
              <div>{toDate(product.data.preOrderDeadline.seconds)}</div>
              <div className=" font-extrabold text-red-500">{`${day} D, ${hour} H`}</div>
            </>
          ) : null}
        </div>
        <div className="col-span-2 z-10 ">
          {!options && (
            <div className="line-through">
              {toLocalCurrency(
                product.data.price,
                authContext?.authState.authUser,
                authContext?.authState.exchangeRate
              )}{' '}
              {user?.currency}
            </div>
          )}
          {!options && (
            <div className="font-semibold">
              {toSalePriceToLocaleCurrency(
                product.data.price,
                authContext?.authState.authUser,
                authContext?.authState.exchangeRate,
                product.data.category
              )}{' '}
              {user?.currency}
            </div>
          )}
        </div>
        <div className="col-span-2">
          {product.data.optioned ? (
            <div onClick={() => handleOption()} className="flex flex-row items-center">
              <div>Option</div>
              {hiddenOption ? (
                <ChevronDoubleUpIcon className="h-5" />
              ) : (
                <ChevronDoubleDownIcon className="h-5" />
              )}
            </div>
          ) : (
            <AddCart product={product} user={user} exchangeRate={exchangeRate} />
          )}
        </div>
      </div>
      {hiddenOption &&
        options?.map((option: any) => (
          <OptionRow
            key={option.id}
            option={option}
            product={product}
            user={user}
            exchangeRate={exchangeRate}
          />
        ))}
    </div>
  );
}
