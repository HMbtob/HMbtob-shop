import { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { LogInForm } from '../../models/login';
import { AuthContext } from '../../hooks/useAuth';

export function Login() {
  const authContext = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = useCallback(async (data: LogInForm) => {
    await authContext?.authHandler.logIn(data);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-gray-100 h-auto min-h-screen w-scree">
      <div className="p-10 lg:p-24 text-center rounded bg-white flex flex-col items-center m-auto w-11/12 lg:w-auto">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/interasiastock.appspot.com/o/assets%2Finterlogo-500.jpeg?alt=media&token=af2ec17d-dc0b-4147-9c7a-650ab2db870a"
          alt="logo"
          className="h-40 lg:h-96"
        />
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
        <div className="text-right text-gray-800 w-11/12 mt-3 lg:w-80 text-xs cursor-pointer">
          forgot password?
        </div>
        <div className="flex flex-col lg:flex-row mt-5 w-80 justify-start">
          <div className="text-gray-700">{'New to INTERASIA ?'}</div>
          <button className=" font-bold cursor-pointer text-gray-800">
            {' Sign Up with e-mail !'}
          </button>
        </div>
      </div>
    </form>
  );
}
