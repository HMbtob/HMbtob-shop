import { useEffect, useState } from 'react';
import { productsFetch } from '../../utils/b2bCommonUtils';
import { Common } from './common';
import { PreOrder } from './preorder';

export function B2bStore() {
  const [products, setProducts] = useState<Array<Object>>([]);
  useEffect(() => {
    productsFetch(setProducts);
  }, []);
  console.log(products);
  return (
    <div className="w-full h-auto flex ">
      <div className=" w-3/5 h-auto flex flex-col items-center mt-12">
        <PreOrder />
        <Common />
      </div>
    </div>
  );
}
