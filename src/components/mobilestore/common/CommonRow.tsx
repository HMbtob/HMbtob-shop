import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../hooks/useAuth';
import { toDate, toSalePriceToLocaleCurrency } from '../../../utils/orderUtils';
import { AddCart } from '../../addCart';
// import { UpdateProduct } from '../updateproduct';
import {
  RefreshIcon,
  XCircleIcon,
  LockClosedIcon,
  LockOpenIcon,
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon
} from '@heroicons/react/outline';
import { db } from '../../../firebase';
import { OptionRow } from '../../optionrow';

export function CommonRow({ product }: any) {
  const authContext = useContext(AuthContext);
  const user: any = authContext?.authState.authUser;
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
    <div className="border-b-2">
      <div className="flex flex-row w-full items-center ">
        <div className="w-1/12">
          <img src={product?.data?.thumbNail} alt="" className="ml-1" />
        </div>
        <div className="flex flex-col w-2/3">
          <div className="p-1 pl-3 text-gray-800 text-xs">{product?.data?.title}</div>

          <div
            className="flex flex-row justify-evenly 
           text-gray-800 font-semibold my-1 text-sm">
            {user?.type === 'customer' && <div>{toDate(product.data.relDate.seconds)}</div>}
            {user?.type === 'admin' && (
              <div className="flex flex-col justify-center items-center">
                <div>
                  {user?.type === 'admin' && product.data.limitedStock === false && (
                    <RefreshIcon
                      className="cursor-pointer h-5"
                      style={{ color: 'blue', opacity: '0.7', fontSize: '15' }}
                      onClick={async (e) => {
                        e.preventDefault();
                        await db
                          .collection('products')
                          .doc(product.id)
                          .update({ limitedStock: true });
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
                        await db
                          .collection('products')
                          .doc(product.id)
                          .update({ limitedStock: false });
                        return false;
                      }}
                    />
                  )}
                </div>
                <div>{product?.data?.barcode}</div>
              </div>
            )}
            {user?.type === 'admin' && (
              <div className="flex flex-col justify-center items-center">
                <div>
                  {user?.type === 'admin' && product.data.reStockable === '불가능' && (
                    <LockClosedIcon
                      className="cursor-pointer h-5"
                      style={{ color: 'red', opacity: '0.7', fontSize: '15' }}
                      onClick={async (e) => {
                        e.preventDefault();
                        await db
                          .collection('products')
                          .doc(product.id)
                          .update({ reStockable: '가능' });
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
                        await db
                          .collection('products')
                          .doc(product.id)
                          .update({ reStockable: '불가능' });
                        return false;
                      }}
                    />
                  )}
                </div>
                <div>{product?.data?.sku}</div>
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
        </div>
        <div className=" w-1/3 py-1">
          {user?.type === 'customer' && product.data.optioned === true ? (
            <div onClick={() => handleOption()} className="flex flex-row items-center">
              <div>Option</div>
              {hiddenOption ? (
                <ChevronDoubleUpIcon className="h-5" />
              ) : (
                <ChevronDoubleDownIcon className="h-5" />
              )}
            </div>
          ) : user?.type === 'customer' && product.data.optioned === false ? (
            <AddCart
              product={product}
              user={user}
              exchangeRate={authContext?.authState.exchangeRate}
            />
          ) : (
            <AddCart
              product={product}
              user={user}
              exchangeRate={authContext?.authState.exchangeRate}
            />
          )}
          {/* {user?.type === 'admin' && (
            <UpdateProduct
              product={product}
              user={user}
              exchangeRate={authContext?.authState.exchangeRate}
            />
          )} */}
        </div>
      </div>

      {hiddenOption &&
        options?.map((option: any) => (
          <OptionRow
            key={option.id}
            option={option}
            product={product}
            user={user}
            exchangeRate={authContext?.authState.exchangeRate}
          />
        ))}
    </div>
  );
}
