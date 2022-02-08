import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../hooks/useAuth';
import { toDate, toSalePriceToLocaleCurrency } from '../../../utils/orderUtils';
import { AddCart } from '../../addCart';
import { UpdateProduct } from '../updateproduct';
import { RefreshIcon, XCircleIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/outline';
import { db } from '../../../firebase';

export function CommonRow({ product }: any) {
  const authContext = useContext(AuthContext);
  const user: any = authContext?.authState.authUser;
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
    <div className="flex flex-row w-full items-center border-b">
      <div className="w-1/12">
        <img src={product?.data?.thumbNail} alt="" className="ml-1" />
      </div>
      <div className="flex flex-col w-2/3">
        <div className="p-1 pl-3 text-gray-800 text-xs">{product?.data?.title}</div>
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
        <div
          className="flex flex-row justify-evenly 
        text-gray-800 font-semibold my-1 text-sm">
          {user?.type === 'customer' && <div>{toDate(product.data.relDate.seconds)}</div>}
          {user?.type === 'admin' && product.data.limitedStock === false && (
            <RefreshIcon
              className="cursor-pointer h-5"
              style={{ color: 'blue', opacity: '0.7', fontSize: '15' }}
              onClick={async (e) => {
                e.preventDefault();
                await db.collection('products').doc(product.id).update({ limitedStock: true });
                return false;
              }}
            />
          )}
          {user?.type === 'admin' && product.data.limitedStock === true && (
            <XCircleIcon
              className="cursor-pointer h-5"
              style={{ color: 'red', opacity: '0.7', fontSize: '15' }}
              onClick={async (e) => {
                e.preventDefault();
                await db.collection('products').doc(product.id).update({ limitedStock: false });
                return false;
              }}
            />
          )}
          {user?.type === 'admin' && product.data.reStockable === '불가능' && (
            <LockClosedIcon
              className="cursor-pointer h-5"
              style={{ color: 'red', opacity: '0.7', fontSize: '15' }}
              onClick={async (e) => {
                e.preventDefault();
                await db.collection('products').doc(product.id).update({ reStockable: '가능' });
                return false;
              }}
            />
          )}
          {user?.type === 'admin' && product.data.reStockable === '가능' && (
            <LockOpenIcon
              className="cursor-pointer h-5"
              style={{ color: 'blue', opacity: '0.7', fontSize: '15' }}
              onClick={async (e) => {
                e.preventDefault();
                await db.collection('products').doc(product.id).update({ reStockable: '불가능' });
                return false;
              }}
            />
          )}

          <div>
            {toSalePriceToLocaleCurrency(
              product.data.optioned && optionPrice ? optionPrice : product.data.price,
              authContext?.authState.authUser,
              authContext?.authState.exchangeRate,
              product.data.category
            )}{' '}
            {user?.currency}
          </div>
        </div>
      </div>
      <div className=" w-1/3 py-1">
        {user?.type === 'customer' && (
          <AddCart
            product={product}
            optioned={product.data.optioned}
            optionPrice={optionPrice}
            optionName={optionName}
            optionStock={optionStock}
            user={user}
            exchangeRate={authContext?.authState.exchangeRate}
          />
        )}
        {user?.type === 'admin' && (
          <UpdateProduct
            product={product}
            user={user}
            exchangeRate={authContext?.authState.exchangeRate}
          />
        )}
      </div>
    </div>
  );
}
