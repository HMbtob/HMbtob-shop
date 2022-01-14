import { Cart } from '../cart';
import { Notice } from '../notice';
import { Common } from './common';
import { PreOrder } from './preorder';
import Searched from './searched';

export function B2bStore({ user, exchangeRate, query }: any) {
  return (
    <div className="w-full h-auto flex flex-row ">
      <div className="w-3/5 min-h-screen h-auto flex flex-col items-center mt-12">
        {/* 검색후 조건부 렌더링 */}
        {query.length > 0 ? (
          <>
            <Searched query={query} />
          </>
        ) : (
          <>
            <PreOrder />
            <Common />
          </>
        )}
      </div>
      <div className=" w-2/5 flex flex-col items-center mt-12 mr-5">
        <Notice />
        <Cart user={user} exchangeRate={exchangeRate} />
      </div>
    </div>
  );
}
