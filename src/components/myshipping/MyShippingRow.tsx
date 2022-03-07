import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toDate, toLocalCurrency } from '../../utils/orderUtils';
import { ChevronDownIcon, ClipboardListIcon } from '@heroicons/react/outline';
import HiddenRow from './HiddenRow';

export function MyShippingRow({ user, shipping, hiddenAll, exchangeRate }: any) {
  const navigate = useNavigate();
  const [forHidden, setForHidden] = useState<Boolean>(true);
  const handleHidden = () => {
    setForHidden(!forHidden);
  };
  return (
    <div className="border-b border-r border-l w-full border-gray-500">
      {console.log('shipping', shipping)}
      <div
        className="text-xs place-items-center grid 
      grid-cols-12 grid-flow-col text-center border-b 
       py-1 bg-white">
        <div>{shipping.data.shippingNumber}</div>
        <div>{toDate(shipping.data.shippedDate.seconds)}</div>
        <div>{shipping.data.name}</div>
        <div className="flex flex-row items-center">
          {shipping?.data?.trackingNumber?.split(',')?.length > 1 ? (
            <div className="col-span-1">Boxes</div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() =>
                window.open(
                  `https://www.dhl.com/global-en/home/tracking/tracking-express.html?submit=1&tracking-id=${shipping?.data?.trackingNumber}`,
                  '_blank'
                )
              }>
              {shipping.data.trackingNumber}{' '}
            </div>
          )}
          <ChevronDownIcon onClick={() => handleHidden()} className="h-5 cursor-pointer" />
          <ClipboardListIcon
            onClick={() => navigate(`/myshipping/${shipping.data.userId}/${shipping.id}`)}
            className="h-5 cursor-pointer"
          />
        </div>
        <div>{shipping.data.nickName}</div>
        <div>{shipping.data.shippingType}</div>
        <div>{shipping.data.country} </div>
        <div></div>
        <div></div>
        <div>
          {toLocalCurrency(shipping.data.itemsPrice, user, exchangeRate)} {user.currency}
        </div>
        <div>
          {toLocalCurrency(shipping.data.shippingFee, user, exchangeRate)} {user.currency}
        </div>
        <div>
          {toLocalCurrency(shipping.data.totalAmount, user, exchangeRate)} {user.currency}
        </div>
      </div>
      {forHidden && hiddenAll ? '' : <HiddenRow shipping={shipping} />}
    </div>
  );
}
