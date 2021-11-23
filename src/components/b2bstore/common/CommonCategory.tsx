import { setCatProps } from '../../../models/b2bStore';
import { categories } from '../../../utils/categoryUtils';

export default function CommonCategory({ cat, setCat }: setCatProps) {
  return (
    <div
      className="grid grid-cols-6 grid-flow-col 
          text-center  bg-gray-200  
          text-gray-600 text-md font-semibold">
      {categories.map((doc, index) => (
        <div
          key={index}
          onClick={() => setCat(Object.keys(doc)[0])}
          id={Object.keys(doc)[0]}
          className={`text-sm cursor-pointer ${
            cat === Object.keys(doc)[0] ? 'bg-gray-400 text-gray-100' : ''
          } `}>
          {Object.values(doc)[0].toUpperCase()}
        </div>
      ))}
    </div>
  );
}
