import { toDate } from '../../utils/orderUtils';
export function CreditRow({ credit }: any) {
  return (
    <div
      className="grid grid-cols-20  grid-flow-col text-center
         text-gray-900 rounded-sm text-sm items-center
         border-b border-l border-r">
      <div className="col-span-3 border-r py-1">{toDate(credit.data.createdAt.seconds)}</div>
      <div className="col-span-4 border-r py-1">{credit.data.content}</div>
      <div className="col-span-3 border-r py-1 text-right pr-2">
        + {credit.data.plus.toLocaleString()} {credit.data.currency}
      </div>
      <div className="col-span-3 border-r py-1 text-right pr-2">
        - {credit.data.minus.toLocaleString()} {credit.data.currency}
      </div>
      <div className="col-span-3 border-r py-1 text-right pr-2">
        {credit.data.balance.toLocaleString()} {credit.data.currency}
      </div>
      <div className="col-span-5">{credit.data.memo}</div>
    </div>
  );
}
