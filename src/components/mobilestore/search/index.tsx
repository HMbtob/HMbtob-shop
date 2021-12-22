import { SearchIcon, ShoppingCartIcon, RefreshIcon } from '@heroicons/react/outline';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

export function Search({ setQuery, carts, handleCart }: any) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = useCallback(async (data) => {
    setQuery(data.search);
    return;
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 bg-gray-100 p-1 w-full 
  flex flex-row items-center top-0 z-99 sticky">
      <input
        {...register('search', {
          required: { value: true, message: 'Required.' },
          maxLength: { value: 50, message: 'Too long.' },
          minLength: { value: 1, message: 'Too short.' }
        })}
        type="text"
        className="h-10 rounded-sm outline-none pl-3 w-8/12"
        placeholder="search"
      />
      <div className="flex flex-row justify-evenly w-4/12">
        <button type="submit" onSubmit={handleSubmit(onSubmit)}>
          <SearchIcon className="h-6" />
        </button>
        <RefreshIcon
          className="h-6"
          onClick={() => {
            setQuery(''), reset();
          }}
        />
        <div className="flex flex-row items-end">
          <ShoppingCartIcon className="h-6" onClick={() => handleCart()} />
          {carts > 0 && (
            <div
              className="bg-red-600 text-xs text-white
           rounded-full text-center px-1 -ml-2">
              {carts}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
