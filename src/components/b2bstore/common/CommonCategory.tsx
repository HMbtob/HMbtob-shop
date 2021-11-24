import { SetCategoryTypes } from '../../../models/b2bStore';
import { categories } from '../../../utils/orderUtils';

export default function CommonCategory({ category, setCategory }: SetCategoryTypes) {
  return (
    <div
      className="grid grid-cols-6 grid-flow-col text-center  
      bg-gray-200 text-gray-600 text-md font-semibold">
      {categories.map((doc, index) => (
        <div
          key={index}
          onClick={() => setCategory(Object.keys(doc)[0])}
          id={Object.keys(doc)[0]}
          className={`text-sm cursor-pointer ${
            category === Object.keys(doc)[0] ? 'bg-gray-400 text-gray-100' : ''
          } `}>
          {Object.values(doc)[0].toUpperCase()}
        </div>
      ))}
    </div>
  );
}
