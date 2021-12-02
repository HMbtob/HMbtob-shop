import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { SignUpForm } from '../../models/signUp';
import { countriesFetch, signInWithEmail } from '../../utils/signUpUtils';
import { useNavigate } from 'react-router';

export function SignUp() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<Array<string>>([]);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = useCallback(async (data: SignUpForm) => {
    const { email, password } = data;
    await signInWithEmail(email, password, data);
    navigate('/');
  }, []);
  useEffect(() => {
    countriesFetch(setCountries);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-gray-100 h-auto min-h-screen w-scree">
      <div className="p-10 lg:p-24 text-center rounded bg-white flex flex-col items-center m-auto w-11/12 lg:w-auto">
        {/* Inputs */}
        <div className="flex flex-col w-11/12 lg:w-80">
          {/* 메일 email */}
          <input
            {...register('email', {
              required: { value: true, message: 'Required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' }
            })}
            type="email"
            placeholder="E-mail"
            className="p-2 border mt-3 rounded"
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600 mb-5">{message}</div>
            )}
          />
          {/* 암호 password */}
          <input
            {...register('password', {
              required: { value: true, message: 'Required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 8, message: 'Too short.' }
            })}
            type="password"
            placeholder="Password"
            className="p-2 border mt-3 rounded"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600 mb-5">{message}</div>
            )}
          />
          {/* Full name */}
          <input
            {...register('fullName', {
              required: { value: true, message: 'Required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' }
            })}
            type="text"
            placeholder="Full Name"
            className="p-2 border mt-3 rounded"
          />
          <ErrorMessage
            errors={errors}
            name="fullName"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600 mb-5">{message}</div>
            )}
          />
          {/* Company name */}
          <input
            {...register('companyName', {
              required: { value: true, message: 'Required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' }
            })}
            type="text"
            placeholder="Company Name"
            className="p-2 border mt-3 rounded"
          />
          <ErrorMessage
            errors={errors}
            name="companyName"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600 mb-5">{message}</div>
            )}
          />
          {/* 나라 countries */}

          <select
            {...register('countries', {
              required: { value: true, message: 'Required.' }
            })}
            className="border p-2 mt-3">
            {countries?.sort().map((co: string, i: number) => (
              <option key={i} value={co}>
                {co}
              </option>
            ))}
          </select>
          <ErrorMessage
            errors={errors}
            name="countries"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600 mb-5">{message}</div>
            )}
          />
          {/* address */}
          <input
            {...register('address', {
              required: { value: true, message: 'Required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' }
            })}
            type="text"
            placeholder="Address"
            className="p-2 border mt-3 rounded"
          />
          <ErrorMessage
            errors={errors}
            name="address"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600 mb-5">{message}</div>
            )}
          />
          {/* Phone Number */}
          <input
            {...register('phoneNumber', {
              required: { value: true, message: 'Required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' },
              valueAsNumber: true
            })}
            type="number"
            placeholder="Phone Number"
            className="p-2 border mt-3 rounded"
          />
          <ErrorMessage
            errors={errors}
            name="phoneNumber"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600 mb-5">{message}</div>
            )}
          />
          {/* monthly purchase amount */}
          <select
            {...register('monthly', {
              minLength: { value: 2, message: 'Required.' }
            })}
            name="monthly"
            className="border p-2 mt-3">
            <option value="a">Monthly Purchase Amount (USD)</option>
            <option value="$0~$5,000">$0~$5,000</option>
            <option value="$5,000~$10,000">$5,000~$10,000</option>
            <option value="Above $10,000">Above $10,000</option>
          </select>
          <ErrorMessage
            errors={errors}
            name="monthly"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600 mb-5">{message}</div>
            )}
          />

          {/* monthly purchase amount */}
          <select
            {...register('payment', {
              minLength: { value: 2, message: 'Required.' }
            })}
            name="payment"
            className="border p-2 mt-3">
            <option value="a">Payment methods you want</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Credit Card (add 4% Fees)">Credit Card (add 4% Fees)</option>
            <option value="Paypal (8% Fees)">Paypal (8% Fees)</option>
          </select>
          <ErrorMessage
            errors={errors}
            name="payment"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600 mb-5">{message}</div>
            )}
          />

          {/* monthly purchase amount */}
          <select
            {...register('transport', {
              minLength: { value: 2, message: 'Required.' }
            })}
            name="transport"
            className="border p-2 mt-3">
            <option value="a">What transport method do you prefer?</option>
            <option value="DHL">DHL</option>
            <option value="EMS">EMS</option>
            <option value="UMAC(PH)">UMAC(PH)</option>
            <option value="Other">Other</option>
          </select>
          <ErrorMessage
            errors={errors}
            name="transport"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600 mb-5">{message}</div>
            )}
          />
          {/* provider */}
          <input
            {...register('provider', {
              required: { value: true, message: 'Required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' }
            })}
            type="text"
            placeholder="Is there a current provider?"
            className="p-2 border mt-3 rounded"
          />
          <ErrorMessage
            errors={errors}
            name="provider"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600 mb-5">{message}</div>
            )}
          />
          {/* requests */}
          <textarea
            {...register('requests', {
              maxLength: { value: 1000, message: 'Too long.' }
            })}
            cols={30}
            rows={3}
            className="p-1 pl-2 text-sm mt-2 border rounded"
            placeholder="Please specify if you have any requests."
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
