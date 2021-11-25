import React, { useEffect, useState } from 'react';
import { noticeFetch } from '../../utils/orderUtils';
import { NoticeHeader } from './NoticeHeader';

export function Notice() {
  const NoticeRow = React.lazy(() =>
    import('./NoticeRow').then((module) => ({
      default: module.NoticeRow
    }))
  );
  const [notices, setNotices] = useState<Array<object>>([]);

  useEffect(() => {
    noticeFetch(setNotices);
  }, []);

  return (
    <div className="w-11/12 h-1/6 overflow-y-auto">
      <div className="text-center text-sm font-bold text-gray-800">NOTICE</div>
      <NoticeHeader />
      <div>
        {notices.map((notice: any, i: number) => (
          <React.Suspense key={i} fallback={<div>Loading...</div>}>
            <NoticeRow />
          </React.Suspense>
        ))}
      </div>
    </div>
  );
}
