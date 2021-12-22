import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from 'react';
import { SaveIcon } from '@heroicons/react/outline';
import { db } from '../../../firebase';
export function UpdateProduct({ product, user, exchangeRate }: any) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      db.collection('products')
        .doc(product.id)
        .update({
          stock: Number(data.b2bQty)
        });
    } catch (e) {
      console.log(e);
    }
    alert('Item Updated');
  };

  useEffect(() => {
    setValue('b2bQty', product.data.stock);
  }, [product]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row">
      <button type="submit" onSubmit={handleSubmit(onSubmit)}>
        <SaveIcon className="h-6 mr-2" />
      </button>
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <div className="w-1/4 text-xs">B2B</div>
          <input
            {...register('b2bQty', {
              required: { value: true, message: 'Required.' },
              maxLength: { value: 5, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' },
              min: { value: 0, message: 'Too small Qty' },
              max: { value: 5000, message: 'Too much Qty' },
              valueAsNumber: true
            })}
            type="number"
            className="border outline-none py-1 w-3/4 text-center"
          />
        </div>
        <ErrorMessage
          errors={errors}
          name="b2bQty"
          render={({ message }) => (
            <div className="text-center font-semibold w-full text-red-600 mb-1">{message}</div>
          )}
        />
        <div className="flex flex-row w-full items-center">
          <div className="w-1/4 text-xs">BIG</div>
          <input type="number" className="border outline-none py-1 w-3/4" disabled />
        </div>
      </div>
    </form>
  );
}
