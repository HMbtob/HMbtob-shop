import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { sortByCreatedAt } from '../../utils/searchUtils';
import './paging.css';
export function Paging({ itemsPerPage, items, setCurrentItems }: any): any {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = (event: any): any => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(sortByCreatedAt(items).slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [items, itemOffset, itemsPerPage]);

  return (
    <div className="w-full flex items-center">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="< previous"
        marginPagesDisplayed={1}
        // css
        breakClassName={'break-me'}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}
