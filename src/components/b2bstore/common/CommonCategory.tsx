import { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { SetCategoryTypes } from '../../../models/b2bStore';
// import { categories } from '../../../utils/orderUtils';

export default function CommonCategory({ category, setCategory, from }: SetCategoryTypes) {
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    db.collection('category')
      .doc('RATES')
      .get()
      .then((snapshot) => setCategories(snapshot.data()));
  }, []);
  return (
    <div
      className={`grid ${
        from === 'mobile' ? 'grid-cols-3' : 'grid-cols-6'
      } grid-flow-row text-center  
      bg-gray-200 text-gray-600 font-semibold w-full`}>
      {Object.keys(categories).map((doc: any, index: any) => (
        <div
          key={index}
          onClick={() => setCategory(categories[doc])}
          id={doc}
          className={`col-span-1 text-sm py-1 cursor-pointer ${
            category === categories[doc] ? 'bg-gray-400 text-gray-100' : ''
          } `}>
          {doc}
        </div>
      ))}
    </div>
  );
}
