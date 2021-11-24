import React from 'react';
import { PreOrder } from './preorder';

export function B2bStore() {
  const Common = React.lazy(() =>
    import('./common').then((module) => ({
      default: module.Common
    }))
  );

  return (
    <div className="w-full h-auto flex ">
      <div className=" w-3/5 h-auto flex flex-col items-center mt-12">
        <PreOrder />

        <React.Suspense fallback={<div>Loading...</div>}>
          <Common />
        </React.Suspense>
      </div>
    </div>
  );
}
