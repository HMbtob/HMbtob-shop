import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { MinusCircleIcon } from '@heroicons/react/outline';
import { cartDelete, cartUpdate } from '../../utils/orderUtils';
export function CartRow({ cart, user }: any) {
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
      <div className="col-span-3">
        <div>{cart.data.title}</div>
        <div className=" text-2xs font-normal">{cart?.data?.optionName}</div>
      </div>
      <div className="col-span-2">
        <div className="w-full flex flex-row items-center justify-center">
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
            className="w-2/3 h-7 border text-center outline-none"
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
      <div className="col-span-1">{cart.data.price}</div>
      <div className="col-span-1">{cart.data.totalPrice}</div>
    </form>
  );
}
