import { ShoppingCartIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { cartSet } from '../../utils/orderUtils';

export function AddCart({ product, user, exchangeRate }: any) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data: any) => {
    //   재고 확인 후 업데이트 함수 실행
    cartSet(user, product, data.qty, exchangeRate);
    setValue('qty', null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <div className="flex flex-row justify-center items-center">
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
          className="border outline-none w-2/3 h-full text-base text-center p-1"
        />
        <button type="submit" onSubmit={handleSubmit(onSubmit)}>
          <ShoppingCartIcon className="h-5 text-gray-600" />
        </button>
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
