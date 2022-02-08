import { useContext, useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { AuthContext } from '../../../hooks/useAuth';
import {
  newOne,
  preOrderLimitTime,
  toDate,
  toLocalCurrency,
  toSalePriceToLocaleCurrency
} from '../../../utils/orderUtils';
import { AddCart } from '../../addCart';

export function PreOrderRow({ product }: any) {
  const authContext = useContext(AuthContext);
  const user: any = authContext?.authState.authUser;
  const exchangeRate: any = authContext?.authState.exchangeRate;
  const { day, hour } = preOrderLimitTime(product.data.preOrderDeadline.seconds);
  const { dayGap } = newOne(product.data.createdAt.seconds);
  const [options, setOptions] = useState<any>(null);
  const [optionId, setOptionId] = useState<any>(null);
  const [optionPrice, setOptionPrice] = useState<any>(null);
  const [optionStock, setOptionStock] = useState<number>(0);
  const [optionName, setOptionName] = useState<string>('');

  const handleChange = () => {
    setOptionName(options?.find((op: any) => op.id === optionId)?.data?.name);
    setOptionPrice(Number(options?.find((op: any) => op.id === optionId)?.data?.optionPrice));
    setOptionStock(Number(options?.find((op: any) => op.id === optionId)?.data?.stock));
  };

  useEffect(() => {
    handleChange();
  }, [optionId]);

  useEffect(() => {
    product.data.optioned &&
      db
        .collection('products')
        .doc(product.id)
        .collection(product.data.optionName)
        .get()
        .then((snapshot) =>
          setOptions(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
        );
  }, []);
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
      <div className="col-span-4 z-10 h-full flex flex-col items-center">
        <div className="h-full items-center flex">{product.data.barcode}</div>
        <div className="h-full items-center flex">{product.data.sku}</div>
      </div>
      <div className="col-span-6 flex flex-row items-center w-full">
        {dayGap < 6 && <div className="text-xs text-red-600 font-bold mr-2">NEW</div>}
        {product.data.title}
      </div>
      {options && (
        <div className="flex flex-row w-full pl-3 items-center pt-1 ">
          <div className="pl-2 font-semibold">{product.data.optionName}</div>
          <select
            className="p-2 text-gray-800"
            value={optionId}
            onChange={(e: any) => setOptionId(e.target.value)}>
            <option>required</option>
            {options?.map((option: any, i: any) => (
              <option key={i} value={option.id}>
                {option.data.stock <= 0
                  ? `SOLD OUT - ${option.data.name} : ${option.data.optionPrice}`
                  : `${option.data.name} : ${option.data.optionPrice}`}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="col-span-2 z-10">{toDate(product.data.relDate.seconds)}</div>
      <div className="col-span-2 z-10">
        <div>{toDate(product.data.preOrderDeadline.seconds)}</div>
        <div className=" font-extrabold text-red-500">{`${day} D, ${hour} H`}</div>
      </div>
      <div className="col-span-2 ">
        <div className="line-through">
          {toLocalCurrency(
            product.data.optioned && optionPrice ? optionPrice : product.data.price,
            authContext?.authState.authUser,
            authContext?.authState.exchangeRate
          )}{' '}
          {user?.currency}
        </div>
        <div className="font-semibold ">
          {toSalePriceToLocaleCurrency(
            product.data.optioned && optionPrice ? optionPrice : product.data.price,
            authContext?.authState.authUser,
            authContext?.authState.exchangeRate,
            product.data.category
          )}{' '}
          {user?.currency}
        </div>
      </div>
      <div className="col-span-2">
        <AddCart
          product={product}
          optioned={product.data.optioned}
          optionPrice={optionPrice}
          optionName={optionName}
          optionStock={optionStock}
          user={user}
          exchangeRate={exchangeRate}
        />
      </div>
    </div>
  );
}
