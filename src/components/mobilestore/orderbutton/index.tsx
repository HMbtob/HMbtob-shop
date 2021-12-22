import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/outline';

export function OrderButton({ carts, handleCart }: any) {
  return (
    <button
      onClick={() => handleCart()}
      className="bottom-1 fixed p-2 px-5 bg-blue-900 
      text-white rounded-full font-semibold flex flex-row
      items-center">
      <div className="text-lg">ORDER</div>
      <div className="flex flex-row items-end">
        <ShoppingCartIcon className="h-5" />
        <div
          className="bg-red-600 text-xs
           rounded-full text-center px-1 -ml-1">
          {carts > 0 && carts}
        </div>
      </div>
    </button>
  );
}
