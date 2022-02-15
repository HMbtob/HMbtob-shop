import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {
  deleteOrder,
  orderUpdate,
  toDate,
  toLocalCurrencyWithoutCal
} from '../../utils/orderUtils';
import { TrashIcon, PhotographIcon } from '@heroicons/react/outline';
import { LinkIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/outline';
export function MyOrderRow({ order, user, exchangeRate }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { qty: order.data.quan, memo: order.data.memo || '' } });

  const onSubmit = (data: any) => {
    orderUpdate(user, order, data.qty, data.memo);
    return;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`grid grid-cols-28 text-sm text-center items-center border py-1 ${
        order.data.canceled ? 'line-through' : ''
      }`}>
      <div className="col-span-2">{order.data.addName}</div>
      <div className="col-span-2 flex flex-row justify-center">
        <TrashIcon className="h-5 pr-3 cursor-pointer" onClick={() => deleteOrder(order, user)} />
        {toDate(order.data.createdAt.seconds)}
      </div>
      <div className="col-span-2">{toDate(order.data.relDate.seconds)}</div>
      <div className="col-span-3">{order.data.barcode}</div>
      <div className="col-span-3">{order.data.sku}</div>
      <div className="col-span-7 text-left flex flex-col">
        <div className="flex flex-row items-center">
          <CheckCircleIcon
            className="h-5 mx-1"
            style={{ color: `${order.data.confirmed ? 'green' : 'red'}` }}
          />
          {order.data.title}
          {order?.data?.url ? <LinkIcon className="h-5 ml-2" /> : null}
          {order?.data?.thumbNailurl ? <PhotographIcon className="h-5 ml-2" /> : null}
        </div>
        <div className="pl-5 text-2xs">{order.data.optioned ? order?.data?.optionName : ''}</div>
      </div>
      <div className="col-span-2 flex flex-col">
        <div>
          {toLocalCurrencyWithoutCal(order.data.price, user, exchangeRate)} {order.data.currency}
        </div>
        {order.data.category === 'specialOrder' && (
          <div className="text-xs">{`(Fee :  ${-1 * user.dcAmount['specialOrderA']})`}</div>
        )}
      </div>
      <div className="col-span-2">
        <input
          {...register('qty', {
            required: { value: true, message: 'Required.' },
            maxLength: { value: 5, message: 'Too long.' },
            minLength: { value: 1, message: 'Too short.' },
            min: { value: 1, message: 'Too small Qty' },
            max: { value: 5000, message: 'Too much Qty' },
            valueAsNumber: true
          })}
          disabled={true}
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
      <div className="col-span-2">
        {toLocalCurrencyWithoutCal(order.data.totalPrice, user, exchangeRate)} {order.data.currency}
      </div>
      <div className="col-span-3 ">
        <input
          {...register('memo', {
            required: { value: false, message: 'Required.' },
            maxLength: { value: 200, message: 'Too long.' },
            minLength: { value: 1, message: 'Too short.' }
          })}
          type="text"
          className="pl-2 text-left w-full h-7 border outline-none"
        />
        <ErrorMessage
          errors={errors}
          name="memo"
          render={({ message }) => (
            <div className="text-center font-semibold w-full text-red-600 mb-1">{message}</div>
          )}
        />
      </div>
      <button type="submit"></button>
    </form>
  );
}
