'use client';
import { debounce } from 'lodash';

import useQueryString from '@/hooks/use-query-string';
import {
  IconArrowLeft,
  IconArrowRight,
  IconDoubleLeftArrow,
  IconDoubleRightArrow,
} from '@/shared/components/icons';
import { ITEMS_PER_PAGE } from '@/shared/constants';

interface IPaginateProps {
  totalPages: number;
  total: number;
}

const Pagination = ({ total, totalPages }: IPaginateProps) => {
  const { currentPage, handleChangePage } = useQueryString();

  const onInputChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      if (value < 1) return;
      handleChangePage(value);
    },
    250,
  );

  if (total <= ITEMS_PER_PAGE) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <PaginateButton
        disabled={currentPage === 1}
        onClick={() => handleChangePage(1)}
      >
        <IconDoubleLeftArrow />
      </PaginateButton>
      <PaginateButton
        disabled={currentPage === 1}
        onClick={() => handleChangePage(currentPage - 1)}
      >
        <IconArrowLeft className="size-4" />
      </PaginateButton>
      <input
        className="h-10 w-20 rounded-full bg-white px-2 text-center font-medium outline-none"
        placeholder="1"
        type="number"
        value={currentPage}
        onChange={onInputChange}
      />
      <PaginateButton
        disabled={currentPage === totalPages}
        onClick={() => handleChangePage(currentPage + 1)}
      >
        <IconArrowRight className="size-4" />
      </PaginateButton>
      <PaginateButton
        disabled={currentPage === totalPages}
        onClick={() => handleChangePage(totalPages)}
      >
        <IconDoubleRightArrow />
      </PaginateButton>
    </div>
  );
};

interface IPaginateButton {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}
function PaginateButton({ children, disabled, onClick }: IPaginateButton) {
  const paginateButtonClassName =
    'size-10 rounded-full bg-white shadow-sm p-2 flex items-center justify-center disabled:bg-gray-200';

  return (
    <button
      className={paginateButtonClassName}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default Pagination;
