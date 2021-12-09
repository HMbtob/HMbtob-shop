import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { specialOrderSubmit } from '../../../utils/specialOrderUtils';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase';

export function SpecialOrderRow({ user, exchangeRate }: any) {
  const [country, setCountry] = useState<any>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data: any): Promise<void> => {
    if (confirm('go?')) {
      const today = new Date();
      specialOrderSubmit(user, data, today, exchangeRate, country);
      reset();
      alert('Done');
    } else {
      return;
    }
  };

  useEffect(() => {
    db.collection('accounts')
      .doc(user.email)
      .collection('addresses')
      .doc('defaultAddress')
      .onSnapshot((snapshot) => setCountry(snapshot.data()?.country));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-20 text-md text-center">
      {/* Add button */}
      <div className="col-span-1 flex flex-row justify-center">
        <button type="submit">
          <PlusCircleIcon className="h-7 cursor-pointer" />
        </button>
      </div>

      {/* Address */}
      <div className="col-span-2">
        <select
          {...register('addName', {
            required: { value: true, message: 'Required.' }
          })}
          className="border h-7 w-full outline-none">
          <option value="Default Address">{'Default Address'}</option>
          <option value="Ship To Korea">{'Ship To Korea'}</option>
          <option value="# 1">{'# 1'}</option>
          <option value="# 2">{'# 2'}</option>
          <option value="# 3">{'# 3'}</option>
        </select>
      </div>
      {/* Title */}
      <div className="col-span-5">
        <input
          {...register('title', {
            required: { value: true, message: 'Required.' },
            maxLength: { value: 100, message: 'Too long.' },
            minLength: { value: 1, message: 'Too short.' }
          })}
          type="text"
          className="w-full h-7 border text-center outline-none"
          placeholder="Copy/Paste item title"
        />
        <ErrorMessage
          errors={errors}
          name="title"
          render={({ message }) => (
            <div className="text-center font-semibold w-full text-red-600 mb-1">{message}</div>
          )}
        />
      </div>
      {/* URL */}
      <div className="col-span-3">
        <input
          {...register('url', {
            required: { value: true, message: 'Required.' },
            maxLength: { value: 300, message: 'Too long.' },
            minLength: { value: 1, message: 'Too short.' }
          })}
          type="text"
          className="w-full h-7 border text-center outline-none"
          placeholder="Copy/Paste item URL"
        />
        <ErrorMessage
          errors={errors}
          name="url"
          render={({ message }) => (
            <div className="text-center font-semibold w-full text-red-600 mb-1">{message}</div>
          )}
        />
      </div>
      {/* Thumb Nail URL */}
      <div className="col-span-3">
        {' '}
        <input
          {...register('thumbNailurl', {
            maxLength: { value: 300, message: 'Too long.' },
            minLength: { value: 1, message: 'Too short.' }
          })}
          type="text"
          className="w-full h-7 border text-center outline-none"
          placeholder="Copy/Paste Thumb Nail URL(optional)"
        />
        <ErrorMessage
          errors={errors}
          name="thumbNailurl"
          render={({ message }) => (
            <div className="text-center font-semibold w-full text-red-600 mb-1">{message}</div>
          )}
        />
      </div>
      {/* Price */}
      <div className="col-span-3">
        <input
          {...register('price', {
            required: { value: true, message: 'Required.' },
            maxLength: { value: 10, message: 'Too long.' },
            minLength: { value: 1, message: 'Too short.' },
            min: { value: 1, message: 'Too small Price' },
            max: { value: 9999999, message: 'Too much Price' },
            valueAsNumber: true
          })}
          type="number"
          className="w-2/3 h-7 border text-center outline-none"
        />
        {' KRW'}
        <ErrorMessage
          errors={errors}
          name="price"
          render={({ message }) => (
            <div className="text-center font-semibold w-full text-red-600 mb-1">{message}</div>
          )}
        />
      </div>
      <div className="col-span-3">
        <input
          {...register('qty', {
            required: { value: true, message: 'Required.' },
            maxLength: { value: 5, message: 'Too long.' },
            minLength: { value: 1, message: 'Too short.' },
            min: { value: 1, message: 'Too small Qty' },
            max: { value: 99999, message: 'Too much Qty' },
            valueAsNumber: true
          })}
          type="number"
          className=" w-1/2 h-7 border text-center outline-none"
        />
        <ErrorMessage
          errors={errors}
          name="qty"
          render={({ message }) => (
            <div className="text-center font-semibold w-full text-red-600 mb-1">{message}</div>
          )}
        />
        {' ea'}
      </div>
    </form>
  );
}
