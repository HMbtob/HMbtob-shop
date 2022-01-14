import { useEffect, useState } from 'react';
import { countriesFetch } from '../../utils/signUpUtils';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import { db } from '../../firebase';
import firebase from 'firebase/compat';

export function CartDefaultAddress({ user, add, exchangeRate }: any) {
  const [countries, setCountries] = useState<Array<string>>([]);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      paymentMethod: add.data.paymentMethod,
      shippingType: add.data.shippingType,
      recipient: add.data.recipient,
      recipientPhoneNumber: add.data.recipientPhoneNumber,
      recipientEmail: add.data.recipientEmail,
      street: add.data.street,
      city: add.data.city,
      states: add.data.states,
      country: add.data.country,
      zipcode: add.data.zipcode
    }
  });

  const [carts, setCarts] = useState<Array<object>>([]);

  const onSubmit = async (data: any) => {
    if (carts.length < 1) {
      return alert('Cart is empty');
    }
    if (confirm('Gonna order?')) {
      const today = new Date();
      const addName = add.data.name;
      // 주소록 저장
      await db.collection('accounts').doc(user.email).collection('addresses').doc(add.id).update({
        paymentMethod: data.paymentMethod,
        shippingType: data.shippingType,
        recipient: data.recipient,
        recipientPhoneNumber: data.recipientPhoneNumber,
        recipientEmail: data.recipientEmail,
        street: data.street,
        city: data.city,
        states: data.states,
        country: data.country,
        zipcode: data.zipcode
      });
      // 카트 -> 주문으로
      await carts
        .reduce((a: any, c: any) => {
          c.data.addName = addName;
          c.data.createdAt = today;
          c.data.userId = user.email;
          c.data.userUid = user.uid;
          c.data.currency = user.currency;
          c.data.exchangeRate = exchangeRate;
          c.data.paymentMethod = data.paymentMethod;
          c.data.shippingType = data.shippingType;
          c.data.country = data.country;
          a.push(c);
          return a;
        }, [])
        .map(async (cart: any) => {
          await db
            .collection('accounts')
            .doc(user.email)
            .collection('order')
            .doc(cart.id)
            .set(cart.data),
            await db
              .collection('products')
              .doc(cart.data.productId)
              .collection('newStockHistory')
              .doc(cart.id)
              .set(cart.data);
        });
      // 카트삭제
      await carts.map(
        async (cart: any) =>
          await db.collection('accounts').doc(user.email).collection('cart').doc(cart.id).delete()
      );
      // 재고 적용
      carts.map(async (cart: any) => {
        const products = await db.collection('products').doc(cart.data.productId).get();
        const product: any = products.data();
        await db
          .collection('products')
          .doc(cart.data.productId)
          .update({
            stock: product.stock - cart.data.quan,
            totalSold: product.totalSold + cart.data.quan,
            totalStock: product.totalStock - cart.data.quan,
            stockHistory: firebase.firestore.FieldValue.arrayUnion({
              type: 'sell on B2B',
              writer: user.nickName || user.email,
              amount: cart.data.quan,
              date: new Date()
            })
          });
      });
      alert('Order completed');
    } else {
      return;
    }
  };

  useEffect(() => {
    db.collection('accounts')
      .doc(user.email)
      .collection('cart')
      .onSnapshot((snapshot) =>
        setCarts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
    countriesFetch(setCountries);
    setValue('paymentMethod', add.data.paymentMethod);
    setValue('shippingType', add.data.shippingType);
    setValue('recipient', add.data.recipient);
    setValue('recipientPhoneNumber', add.data.recipientPhoneNumber);
    setValue('recipientEmail', add.data.recipientEmail);
    setValue('street', add.data.street);
    setValue('city', add.data.city);
    setValue('states', add.data.states);
    setValue('country', add.data.country);
    setValue('zipcode', add.data.zipcode);
  }, [user.email, add]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button
        type="submit"
        className=" bg-blue-900 rounded-sm text-gray-100 py-2 px-6 font-bold my-3">
        ORDER
      </button>
      {/* Payment Method */}
      <div className="flex flex-row items-center my-1">
        <div className="w-1/3 text-right">{'Payment Method : '}</div>
        <div className="w-2/3">
          <select
            {...register('paymentMethod', {
              required: { value: true, message: 'Payment Method is required.' }
            })}
            className="py-1 px-1 border rounded w-4/5 outline-none">
            <option value="credit">Bank Transfer(Credit)</option>
          </select>
          <ErrorMessage
            errors={errors}
            name="paymentMethod"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600">{message}</div>
            )}
          />
        </div>
      </div>
      {/* Shipping Type */}
      <div className="flex flex-row items-center my-1">
        <div className="w-1/3 text-right">{'Shipping Type : '}</div>
        <div className="w-2/3">
          <select
            {...register('shippingType', {
              required: { value: true, message: 'Shipping Type is required.' }
            })}
            className="py-1 px-1 border rounded w-4/5 outline-none">
            <option value="dhl">DHL</option>
            <option value="EMS">EMS</option>
            <option value="UMAC(PH)">UMAC(PH)</option>
            <option value="CJ Logisticd">CJ Logisticd</option>
          </select>
          <ErrorMessage
            errors={errors}
            name="shippingType"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600">{message}</div>
            )}
          />
        </div>
      </div>
      {/* Recipient  */}
      <div className="flex flex-row items-center my-1">
        <div className="w-1/3 text-right">{'Recipient : '}</div>
        <div className="w-2/3">
          <input
            {...register('recipient', {
              required: { value: true, message: 'Recipient is required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' }
            })}
            type="text"
            placeholder="Recipient"
            className="py-1 px-2 border rounded w-4/5 outline-none"
          />
          <ErrorMessage
            errors={errors}
            name="recipient"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600">{message}</div>
            )}
          />
        </div>
      </div>
      {/* Recipient PhoneNumber */}
      <div className="flex flex-row items-center my-1">
        <div className="w-1/3 text-right">{'Recipient PhoneNumber : '}</div>
        <div className="w-2/3">
          <input
            {...register('recipientPhoneNumber', {
              required: { value: true, message: 'Recipient PhoneNumber is required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' }
            })}
            type="number"
            placeholder="Recipient PhoneNumber"
            className="py-1 px-2 border rounded w-4/5 outline-none"
          />
          <ErrorMessage
            errors={errors}
            name="recipientPhoneNumber"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600">{message}</div>
            )}
          />
        </div>
      </div>
      {/* Recipient Email */}
      <div className="flex flex-row items-center my-1">
        <div className="w-1/3 text-right">{'Recipient Email : '}</div>
        <div className="w-2/3">
          <input
            {...register('recipientEmail', {
              required: { value: true, message: 'Recipient Email is required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' }
            })}
            type="text"
            placeholder="Recipient Email"
            className="py-1 px-2 border rounded w-4/5 outline-none"
          />
          <ErrorMessage
            errors={errors}
            name="recipientEmail"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600">{message}</div>
            )}
          />
        </div>
      </div>
      {/* Street  */}
      <div className="flex flex-row items-center my-1">
        <div className="w-1/3 text-right">{'Street : '}</div>
        <div className="w-2/3">
          <input
            {...register('street', {
              required: { value: true, message: 'Street is required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' }
            })}
            type="text"
            placeholder="Street"
            className="py-1 px-2 border rounded w-4/5 outline-none"
          />
          <ErrorMessage
            errors={errors}
            name="street"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600">{message}</div>
            )}
          />
        </div>
      </div>
      {/* City */}
      <div className="flex flex-row items-center my-1">
        <div className="w-1/3 text-right">{'City : '}</div>
        <div className="w-2/3">
          <input
            {...register('city', {
              required: { value: true, message: 'City is required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' }
            })}
            type="text"
            placeholder="City"
            className="py-1 px-2 border rounded w-4/5 outline-none"
          />
          <ErrorMessage
            errors={errors}
            name="city"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600">{message}</div>
            )}
          />
        </div>
      </div>
      {/* States */}
      <div className="flex flex-row items-center my-1">
        <div className="w-1/3 text-right">{'States : '}</div>
        <div className="w-2/3">
          <input
            {...register('states', {
              required: { value: true, message: 'State is required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' }
            })}
            type="text"
            placeholder="States"
            className="py-1 px-2 border rounded w-4/5 outline-none"
          />
          <ErrorMessage
            errors={errors}
            name="states"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600">{message}</div>
            )}
          />
        </div>
      </div>
      {/* Country */}
      <div className="flex flex-row items-center my-1">
        <div className="w-1/3 text-right">{'Country : '}</div>
        <div className="w-2/3">
          <select
            {...register('country', {
              required: { value: true, message: 'Country is required.' }
            })}
            className="py-1 px-1 border rounded w-4/5 outline-none">
            {countries?.sort().map((co: string, i: number) => (
              <option key={i} value={co}>
                {co}
              </option>
            ))}
          </select>
          <ErrorMessage
            errors={errors}
            name="country"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600">{message}</div>
            )}
          />
        </div>
      </div>
      {/* Zip Code */}
      <div className="flex flex-row items-center my-1">
        <div className="w-1/3 text-right">{'Zip Code : '}</div>
        <div className="w-2/3">
          <input
            {...register('zipcode', {
              required: { value: true, message: 'Zip Code is required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' }
            })}
            type="text"
            placeholder="Zip Code"
            className="py-1 px-2 border rounded w-4/5 outline-none"
          />
          <ErrorMessage
            errors={errors}
            name="zipcode"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600">{message}</div>
            )}
          />
        </div>
      </div>
    </form>
  );
}
