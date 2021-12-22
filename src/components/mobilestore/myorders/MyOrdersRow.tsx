import { deleteOrder, toDate, toLocalCurrencyWithoutCal } from '../../../utils/orderUtils';
import { TrashIcon, PhotographIcon } from '@heroicons/react/outline';
import { LinkIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/outline';
export function MyOrdersRow({ order, exchangeRate, user }: any) {
  return (
    <div
      className={`grid grid-cols-12 text-sm text-center items-center border py-1 ${
        order.data.canceled ? 'line-through' : ''
      }`}>
      <div className="col-span-2 flex flex-row">{toDate(order.data.relDate.seconds)} </div>{' '}
      <div className="col-span-6 text-left flex flex-row items-center">
        <CheckCircleIcon
          className="h-5 mx-1"
          style={{ color: `${order.data.confirmed ? 'green' : 'red'}` }}
        />
        {order.data.title}
        {order?.data?.url ? <LinkIcon className="h-5 ml-2" /> : null}
        {order?.data?.thumbNailurl ? <PhotographIcon className="h-5 ml-2" /> : null}{' '}
        <TrashIcon className="h-5 pr-3 cursor-pointer" onClick={() => deleteOrder(order, user)} />
      </div>
      <div className="col-span-2 flex flex-col">
        {toLocalCurrencyWithoutCal(order.data.price, user, exchangeRate)} {order.data.currency}
      </div>
      <div className="col-span-2 flex flex-col">{order.data.quan} EA</div>
    </div>
  );
}
