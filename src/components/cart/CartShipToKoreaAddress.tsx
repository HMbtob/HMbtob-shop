import React, { useEffect, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import DaumPostcode from 'react-daum-postcode';
import { db } from '../../firebase';

export function CartShipToKoreaAddress({ user, add, exchangeRate }: any) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      paymentMethod: add?.data.paymentMethod,
      shippingType: add?.data.shippingType,
      recipient: add?.data.recipient,
      recipientPhoneNumber: add?.data.recipientPhoneNumber,
      recipientEmail: add?.data.recipientEmail,
      address: add?.data.address,
      zipcode: add?.data.zipcode,
      detailAddress: add?.data.detailAddress
    }
  });
  const [carts, setCarts] = useState<Array<object>>([]);

  const onSubmit = async (data: any) => {
    const today = new Date();
    const addName = add.data.name;
    // 주소록 저장
    await db.collection('accounts').doc(user.email).collection('addresses').doc(add.id).update({
      paymentMethod: data.paymentMethod,
      shippingType: data.shippingType,
      recipient: data.recipient,
      recipientPhoneNumber: data.recipientPhoneNumber,
      recipientEmail: data.recipientEmail,
      address: data.address,
      zipcode: data.zipcode,
      detailAddress: data.detailAddress
    });
    // 카트 -> 주문으로
    carts
      .reduce((a: any, c: any) => {
        c.data.addName = addName;
        c.data.createdAt = today;
        c.data.userId = user.email;
        c.data.userUid = user.uid;
        c.data.currency = user.currency;
        c.data.exchangeRate = exchangeRate;
        a.push(c);
        return a;
      }, [])
      .map(
        async (cart: any) =>
          await db.collection('accounts').doc(user.email).collection('order').doc().set(cart.data)
      );
    // 카트삭제
    carts.map(
      async (cart: any) =>
        await db.collection('accounts').doc(user.email).collection('cart').doc(cart.id).delete()
    );
  };

  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const handlePostCode = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setValue('address', fullAddress);
    setValue('zipcode', data?.zonecode);
    setIsPopupOpen(false);
  };

  useEffect(() => {
    db.collection('accounts')
      .doc(user.email)
      .collection('cart')
      .onSnapshot((snapshot) =>
        setCarts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
    setValue('paymentMethod', add?.data.paymentMethod);
    setValue('shippingType', add?.data.shippingType);
    setValue('recipient', add?.data.recipient);
    setValue('recipientPhoneNumber', add?.data.recipientPhoneNumber);
    setValue('recipientEmail', add?.data.recipientEmail);
    setValue('address', add?.data.address);
    setValue('detailAddress', add?.data.detailAddress);
  }, [user.email, add]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="submit" className=" bg-blue-900 rounded-sm text-gray-100 py-1 px-4 font-bold">
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

      {/* Address */}
      <div className="flex flex-row items-center my-1">
        <div className="w-1/3 text-right flex flex-col">
          {'Address : '}
          <div className="w-full justify-center">
            {!isPopupOpen ? (
              <button
                type="button"
                onClick={openPostCode}
                className=" bg-gray-400 rounded-md p-1 px-2 ml-1 text-gray-100 items-end">
                Search{' '}
              </button>
            ) : (
              <button
                type="button"
                onClick={closePostCode}
                className=" bg-gray-400 rounded-md p-1 px-2 ml-3 text-gray-100">
                Close
              </button>
            )}
          </div>
        </div>
        <div className="w-2/3 flex flex-col items-center justify-center">
          <input
            {...register('address', {
              required: { value: true, message: 'Address is required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' }
            })}
            disabled
            type="text"
            placeholder="Address"
            className="py-1 px-2 border rounded w-4/5 outline-none bg-gray-200"
          />
          <div id="popupDom" className="w-4/5">
            {isPopupOpen && (
              <DaumPostcode
                // style={{
                //   display: 'block',
                //   position: 'absolute',
                //   top: '20%',
                //   right: '20%',
                //   width: '600px',
                //   height: '600px',
                //   padding: '7px'
                // }}
                onComplete={handlePostCode}
                autoClose
              />
            )}
          </div>
          <ErrorMessage
            errors={errors}
            name="address"
            render={({ message }) => (
              <div className="text-center font-semibold w-full text-red-600">{message}</div>
            )}
          />
        </div>
      </div>
      {/* Detail address/search button */}
      <div className="flex flex-row items-center my-1">
        <div className="w-1/3 text-right">{'Detail address : '}</div>
        <div className="w-2/3">
          <input
            {...register('detailAddress', {
              required: { value: true, message: 'Detail address is required.' },
              maxLength: { value: 50, message: 'Too long.' },
              minLength: { value: 1, message: 'Too short.' }
            })}
            type="text"
            placeholder="Detail Address"
            className="py-1 px-2 border rounded w-4/5 outline-none "
          />
          <ErrorMessage
            errors={errors}
            name="detailAddress"
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
