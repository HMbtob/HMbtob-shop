import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { db } from '../../firebase';
import { InvoiceRow } from './InvoiceRow';

export function Invoice({ user, exchangeRate }: any) {
  const { userId, shippingId } = useParams();
  const [orderInshipping, setOrderInshipping] = useState<any>([]);
  const [shipping, setShipping] = useState<any>({});
  const componentRef: any = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const printGoback = () => {
    handlePrint();
    // 뒤로가기
  };
  console.log(orderInshipping, shipping);

  useEffect(() => {
    db.collection('accounts')
      .doc(userId)
      .collection('shippingsInAccount')
      .doc(shippingId)
      .onSnapshot((snapshot) => setShipping({ id: snapshot.id, data: snapshot.data() }));

    db.collection('accounts')
      .doc(userId)
      .collection('shippingsInAccount')
      .doc(shippingId)
      .collection('orderListInShippings')
      .onSnapshot((snapshot) =>
        setOrderInshipping(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);

  class ComponentToPrint extends React.Component {
    render() {
      return (
        <div className="m-auto mt-12 w-11/12 ">
          <div className="w-full">
            <div className="text-left text-2xl font-semibold mb-5">INVOICE</div>
            <div className="flex-row flex w-full mb-5">
              <div className="w-2/3">
                <div className="text-base font-semibold">Seller</div>
                <div className="text-sm">INTERASIA</div>
                <div className="text-sm">#417, 78 Digital-ro 10-gil</div>
                <div className="text-sm">Geumcheon-gu, Seoul, Korea</div>
                <div className="text-sm">Tel: +82 2 10 2088 0022</div>
                <div className="text-sm">Fax: +82 2 3281 0125</div>
              </div>
              <div className="w-1/3 flex flex-col justify-center text-sm">
                <div>invoice No.: {shipping?.data?.shippingNumber}</div>
                <div>invoice Date: {new Date().toLocaleString().substring(0, 14)}</div>
              </div>
            </div>
            <div className="flex-row flex w-full mb-5">
              <div className="w-2/3">
                <div className="text-base font-semibold">Consignee</div>

                <div className="flex flex-col w-40 text-sm">
                  <div>{shipping?.data?.recipient}</div>

                  <div>{shipping?.data?.street}</div>

                  <div>{shipping?.data?.city}</div>
                </div>
                <div className="text-sm">
                  <span>{shipping?.data?.zipcode}</span>
                  {', '}
                  <span>{shipping?.data?.states}</span>
                  {', '}
                  <span>{shipping?.data?.country}</span>
                </div>

                <div>{shipping?.data?.recipientEmail}</div>
              </div>
              <div className="bw-1/3  flex flex-col justify-center text-sm"></div>
            </div>
            <div
              className="grid grid-cols-28 text-center
             bg-gray-700 text-white text-sm">
              <div className="col-span-1">no.</div>
              <div className="col-span-16">Description of goods</div>
              <div className="col-span-3">Option</div>
              <div className="col-span-2">Qty</div>
              <div className="col-span-3">Unit price</div>
              <div className="col-span-3">Amount</div>
            </div>
            {orderInshipping &&
              orderInshipping
                .sort((a: any, b: any) => {
                  return a.data.title < b.data.title ? -1 : a.data.title > b.data.title ? 1 : 0;
                })
                .map((list: any, i: any) => <InvoiceRow key={i} list={list} index={i} />)}
            <div
              className="grid grid-cols-28 text-center
             text-sm border-r border-l border-black border-b">
              <div className="col-span-1  border-r border-black"></div>
              <div className="col-span-16 border-r border-black text-left pl-2 flex items-center">
                {shipping?.data?.shippingType?.toUpperCase() || 'shipping Fee'}
              </div>
              <div className="col-span-3  border-black"></div>
              <div className="col-span-2 border-r border-l border-black"></div>
              <div className="col-span-3 border-r border-black"> </div>
              <div className="col-span-3 justify-center flex flex-row items-center w-full p-1">
                <div>{shipping?.data?.shippingFee?.toLocaleString()} </div>
                <div>&nbsp;</div>
                <div>{shipping?.data?.currency}</div>
              </div>
            </div>
            <div
              className="grid grid-cols-28 text-center
             text-base border-r border-l border-black text-gray-50 border-b">
              <div className="col-span-1  border-r border-black"></div>
              <div className="col-span-16 border-r border-black"></div>
              <div className="col-span-3 border-black">a</div>
              <div className="col-span-2 border-r border-l border-black"></div>
              <div className="col-span-3 border-r border-black"> </div>
              <div className="col-span-2"></div>
            </div>
            <div
              className="grid grid-cols-28 text-center
             text-base border-r border-l border-black text-gray-50 border-b">
              <div className="col-span-1  border-r border-black"></div>
              <div className="col-span-16 border-r border-black"></div>
              <div className="col-span-3  border-black">a</div>
              <div className="col-span-2 border-r  border-l border-black"></div>
              <div className="col-span-3 border-r border-black"> </div>
              <div className="col-span-3"></div>
            </div>
            <div
              className="grid grid-cols-28 text-center
             text-base border-r border-l border-black text-gray-50 border-b">
              <div className="col-span-1  border-r border-black"></div>
              <div className="col-span-16 border-r border-black"></div>
              <div className="col-span-3  border-black">a</div>
              <div className="col-span-2  border-l border-r border-black"></div>
              <div className="col-span-3 border-r border-black"> </div>
              <div className="col-span-3"></div>
            </div>
            <div
              className="grid grid-cols-28 text-center
             text-sm border-r border-l border-black ">
              <div className="col-span-1  border-r border-black"></div>
              <div className="col-span-16 border-r border-black p-1 font-semibold  text-left pl-2">
                Total Amount in{' '}
              </div>
              <div className="col-span-3  border-black"></div>
              <div className="col-span-2  border-l border-r border-black"></div>
              <div className="col-span-3 border-r border-black"></div>
              <div className="col-span-3 flex flex-row items-center justify-center w-full">
                <div>{shipping?.data?.totalAmount?.toLocaleString()}</div>
                &nbsp;{shipping?.data?.currency}
              </div>
            </div>
            <div
              className="grid grid-cols-28 text-center
             text-lg font-semibold border border-black">
              <div className="col-span-20 border-black p-1">{'Declaration of origin'}</div>
              <div className="col-span-8 p-1  border-l border-black">{'Date & Company Chop'}</div>
            </div>
            <div
              className="grid grid-cols-28 text-center
             text-lg font-semibold border border-black h-48">
              <div className="col-span-20  border-black p-12">
                {'We the undersigned, the exporter of the products, '}
                {'covered by this document, declare that, except where otherwise'}
                {'clearly indicated, these products are of South Korea preferntial origin.'}
              </div>
              <div className="col-span-8  border-l border-black flex-col">
                <div className=" h-36"></div>
                <div className="border-t border-black p-2">INTERASIA</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return (
    <div className="w-full flex flex-col justify-start items-center mt-20">
      <button
        onClick={printGoback}
        className="mt-10 bg-gray-800
      text-white w-40 py-1 px-4 rounded font-semibold">
        {' '}
        PRINT
      </button>
      <ComponentToPrint ref={componentRef} />
    </div>
  );
}
