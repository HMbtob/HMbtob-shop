import { Notice } from '../notice';
import { Common } from './common';
import { PreOrder } from './preorder';

export function B2bStore() {
  return (
    <div className="w-full h-auto flex ">
      <div className="w-3/5 h-auto flex flex-col items-center mt-12">
        <PreOrder />
        <Common />
      </div>
      <div className=" w-2/5 flex flex-col items-center mt-12 mr-5">
        <Notice />
      </div>
    </div>
  );
}
