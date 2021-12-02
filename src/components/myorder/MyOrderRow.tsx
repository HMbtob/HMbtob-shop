import { toDate, toLocalCurrency } from '../../utils/orderUtils';

export function MyOrderRow({ order, user, exchangeRate }: any) {
  console.log(order);
  return (
    <div className="grid grid-cols-20 text-sm text-center">
      <div className="col-span-2">{toDate(order.data.createdAt.seconds)}</div>
      <div className="col-span-2">{toDate(order.data.relDate.seconds)}</div>
      <div className="col-span-2">{order.data.barcode}</div>
      <div className="col-span-2">{order.data.sku}</div>
      <div className="col-span-6 text-left">{order.data.title}</div>
      <div className="col-span-2">
        {toLocalCurrency(order.data.price, user, exchangeRate)} {order.data.currency}
      </div>
      <div className="col-span-2">
        {order.data.quan}
        {' ea'}
      </div>
      <div className="col-span-2">
        {toLocalCurrency(order.data.totalPrice, user, exchangeRate)} {order.data.currency}
      </div>
    </div>
  );
}
