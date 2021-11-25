import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export function Paging({ itemsPerPage, items, setCurrentItems }: any): any {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = (event: any): any => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [items, itemOffset, itemsPerPage]);

  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="< previous"
        marginPagesDisplayed={1}
      />
    </div>
  );
}
