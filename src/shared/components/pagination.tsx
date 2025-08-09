'use client'
import useQueryString from '@/hooks/useQueryString'
import { debounce } from 'lodash'
import { ITEMS_PER_PAGE } from '@/shared/constants'
import {
  IconArrowLeft,
  IconArrowRight,
  IconDoubleLeftArrow,
  IconDoubleRightArrow,
} from '@/shared/components/icons'

interface IPaginateProps {
  totalPages: number
  total: number
}

const Pagination = ({ totalPages, total }: IPaginateProps) => {
  const { handleChangePage, currentPage } = useQueryString()

  const onInputChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value < 1) return
    handleChangePage(value)
  }, 250)

  if (total <= ITEMS_PER_PAGE) return null
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
  )
}

interface IPaginateBtn {
  onClick: () => void
  disabled: boolean
  children: React.ReactNode
}
function PaginateButton({ onClick, disabled, children }: IPaginateBtn) {
  const paginateBtnClassName =
    'size-10 rounded-full bg-white shadow-sm p-2 flex items-center justify-center disabled:bg-gray-200'

  return (
    <button
      className={paginateBtnClassName}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export default Pagination
