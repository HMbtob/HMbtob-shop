import { setQueryProps } from '../../models/search';
import { SearchIcon } from '@heroicons/react/solid';
import { RefreshIcon } from '@heroicons/react/solid';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
export function Search({ setQuery }: setQueryProps) {
  const { register, handleSubmit } = useForm();

  const onSubmit = useCallback(async (data) => {
    setQuery(data.search);
    return;
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-200 p-1 rounded-sm w-96 flex flex-row">
      <input
        {...register('search', {
          required: { value: true, message: 'Required.' },
          maxLength: { value: 50, message: 'Too long.' },
          minLength: { value: 1, message: 'Too short.' }
        })}
        type="text"
        className=" rounded-sm outline-none pl-2 w-80"
        placeholder="search"
      />{' '}
      <div className="flex flex-row justify-evenly w-1/4">
        <SearchIcon
          className="cursor-pointer text-gray-500 h-6"
          type="submit"
          // onClick={searchedProducts}
        />
        <RefreshIcon
          // onClick={handleClear}
          className="cursor-pointer text-gray-500 h-6"
        />
      </div>
    </form>
  );
}
