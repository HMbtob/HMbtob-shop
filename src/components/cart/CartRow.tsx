import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { MinusCircleIcon } from '@heroicons/react/outline';
import { cartDelete, cartUpdate, toSalePriceToLocaleCurrency } from '../../utils/orderUtils';
export function CartRow({ cart, exchangeRate, user }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { qty: cart.data.quan } });
  const onSubmit = useCallback(async (data) => {
    cartUpdate(user, cart, data.qty);
    return;
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-7 place-items-center text-center text-xs py-1 border-b border-l border-r bg-gray-100">
      <div className="col-span-3">{cart.data.title}</div>
      <div className="col-span-2">
        <div className=" bg-red-100 flex flex-row items-center justify-center">
          <input
            {...register('qty', {
              required: { value: true, message: 'Required.' },
              maxLength: { value: 5, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' },
              valueAsNumber: true
            })}
            type="number"
            className=" w-1/3 h-7 border text-center outline-none"
          />
          <MinusCircleIcon className="h-5 cursor-pointer" onClick={() => cartDelete(user, cart)} />
        </div>
        <ErrorMessage
          errors={errors}
          name="qty"
          render={({ message }) => (
            <div className="text-center font-semibold w-full text-red-600 mb-1">{message}</div>
          )}
        />
      </div>
      <div className="col-span-1">
        {toSalePriceToLocaleCurrency(cart.data.price, user, exchangeRate, cart.data.category)}
      </div>
      <div className="col-span-1">
        {toSalePriceToLocaleCurrency(cart.data.totalPrice, user, exchangeRate, cart.data.category)}
      </div>
    </form>
  );
}
