export function HiddenRowRow({ li }: any) {
  return (
    <div className="grid grid-cols-4 text-gray-800 items-center py-1">
      <div className="col-span-1"></div>

      <div
        className="col-span-1 text-left cursor-pointer"
        onClick={() =>
          window.open(
            `https://www.dhl.com/global-en/home/tracking/tracking-express.html?submit=1&tracking-id=${li}`,
            '_blank'
          )
        }>
        {li}
      </div>
    </div>
  );
}

export default function HiddenRow({ orderListInShippings, shipping }: any) {
  return (
    <div
      className="grid-flow-col text-center
    py-2 text-xs bg-white">
      {' '}
      {shipping && shipping?.data?.trackingNumber?.split(',')?.length > 1 && (
        <div className="border-b">
          {shipping?.data?.trackingNumber?.split(',')?.map((li: any, i: any) => (
            <HiddenRowRow key={i} li={li} />
          ))}
        </div>
      )}
      {orderListInShippings &&
        orderListInShippings?.map((li: any, i: any) => (
          <div key={i} className="grid grid-cols-12 text-gray-800 items-center pt-1">
            {/* <div className="col-span-2"></div> */}
            <div className="col-span-6 text-left">{li.data.title}</div>
            <div className="col-span-2">
              {li.data.price} {li.data.currency}
            </div>
            <div className="col-span-2">{li.data.barcode} </div>
            <div className="col-span-2">{li.data.quan} ea</div>
          </div>
        ))}
    </div>
  );
}
