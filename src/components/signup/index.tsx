import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { SignUpForm } from '../../models/signUp';

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = useCallback(async (data: SignUpForm) => {
    console.log(data);
  }, []);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-gray-100 h-auto min-h-screen w-scree">
      <div className="p-10 lg:p-24 text-center rounded bg-white flex flex-col items-center m-auto w-11/12 lg:w-auto">
        <div className="flex flex-col w-11/12 lg:w-80">
          <input
            {...register('email', {
              required: { value: true, message: 'Required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' }
            })}
            type="email"
            placeholder="E-mail"
            className="p-3 border mt-3 rounded"
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600 mb-5">{message}</div>
            )}
          />
          <input
            {...register('password', {
              required: { value: true, message: 'Required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 8, message: 'Too short.' }
            })}
            type="password"
            placeholder="Password"
            className="p-3 border mt-3 rounded"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600 mb-5">{message}</div>
            )}
          />
        </div>
        <button
          type="submit"
          className="text-lg font-semibold bg-gray-400 w-11/12 lg:w-80 p-2 rounded mt-3 text-white">
          Sign In
        </button>
      </div>
    </form>
  );
}
