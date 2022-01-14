import { ShoppingCartIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { cartSet } from '../../utils/orderUtils';
import { useEffect, useState } from 'react';

export function AddCart({ product, user, exchangeRate }: any) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const [soldOut, setSoldOut] = useState<any>(false);
  const forSoldOut = (product: any): void => {
    Number(product.data.stock) > 0 || product.data.limitedStock === false
      ? setSoldOut(false)
      : setSoldOut(true);
  };
  const onSubmit = async (data: any) => {
    try {
      //   재고 확인 후 업데이트 함수 실행
      if (Number(product.data.stock) >= data.qty || product.data.limitedStock === false) {
        cartSet(user, product, data.qty, exchangeRate);
        setValue('qty', null);
        alert('Item added');
      } else if (Number(product.data.stock) <= data.qty && product.data.limitedStock === true) {
        alert(`Please order ${Number(product.data.stock) - 1} or less`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    forSoldOut(product);
  }, [product]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <div className="flex flex-row justify-center items-center">
        {soldOut ? (
          <div className=" font-bold text-red-600 text-sm">SOLD OUT</div>
        ) : (
          <>
            <input
              {...register('qty', {
                required: { value: true, message: 'Required.' },
                maxLength: { value: 5, message: 'Too long.' },
                minLength: { value: 1, message: 'Too short.' },
                min: { value: 1, message: 'Too small Qty' },
                max: { value: 5000, message: 'Too much Qty' },
                valueAsNumber: true
              })}
              type="number"
              className="border outline-none w-2/3 h-full text-base text-center p-1 py-2"
            />
            <button type="submit" onSubmit={handleSubmit(onSubmit)}>
              <ShoppingCartIcon className="h-6 text-gray-600" />
            </button>
          </>
        )}
      </div>
      <ErrorMessage
        errors={errors}
        name="qty"
        render={({ message }) => (
          <div className="text-center font-semibold w-full text-red-600 mb-1">{message}</div>
        )}
      />
    </form>
  );
}
