import { SetCategoryTypes } from '../../../models/b2bStore';
import { categories } from '../../../utils/orderUtils';

export default function CommonCategory({ category, setCategory, from }: SetCategoryTypes) {
  return (
    <div
      className={`grid ${
        from === 'mobile' ? 'grid-cols-3' : 'grid-cols-6'
      } grid-flow-row text-center  
      bg-gray-200 text-gray-600 font-semibold w-full`}>
      {categories.map((doc, index) => (
        <div
          key={index}
          onClick={() => setCategory(Object.keys(doc)[0])}
          id={Object.keys(doc)[0]}
          className={`col-span-1 text-sm py-1 cursor-pointer ${
            category === Object.keys(doc)[0] ? 'bg-gray-400 text-gray-100' : ''
          } `}>
          {Object.values(doc)[0].toUpperCase()}
        </div>
      ))}
    </div>
  );
}
