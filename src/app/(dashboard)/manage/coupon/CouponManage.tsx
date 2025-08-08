'use client'
import { IconEdit } from '@/shared/components/icons'
import { Input } from '@/shared/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { allValue, commonClassName, couponStatus } from '@/shared/constants'
import { ECouponType } from '@/types/enums'
import Link from 'next/link'
import ActionDeleteCoupon from './ActionDeleteCoupon'
import { TCouponItem } from '@/types'
import useQueryString from '@/hooks/useQueryString'
import {
  BouncedLink,
  StatusBadge,
  TableAction,
  Pagination,
  Heading,
} from '@/shared/components'

const CouponManage = ({
  coupons,
  totalPages,
  total,
}: {
  coupons: TCouponItem[] | undefined
  totalPages: number
  total: number
}) => {
  const { handleSearchData, handleChangeQS } = useQueryString()

  return (
    <div>
      <BouncedLink url="/manage/coupon/new"></BouncedLink>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading className="">Quản lý mã giảm giá</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm coupon..."
              onChange={handleSearchData}
            />
          </div>
          <Select
            defaultValue={allValue}
            onValueChange={(value) => handleChangeQS('active', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {couponStatus.map((status) => (
                  <SelectItem key={status.value} value={status.value + ''}>
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Mã</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Giảm giá</TableHead>
            <TableHead>Sử dụng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons &&
            coupons.length > 0 &&
            coupons.map((coupon) => (
              <TableRow key={coupon.code}>
                <TableCell>
                  <strong>{coupon.code}</strong>
                </TableCell>
                <TableCell>
                  <strong className="text-primary">{coupon.title}</strong>
                </TableCell>
                <TableCell>
                  {coupon.type === ECouponType.AMOUNT ? (
                    <>{coupon.value.toLocaleString()}</>
                  ) : (
                    <>{coupon.value} %</>
                  )}
                </TableCell>
                <TableCell>
                  <>
                    {coupon.used}/{coupon.limit}
                  </>
                </TableCell>
                <TableCell>
                  {coupon.active ? (
                    <StatusBadge
                      item={{
                        title: 'Đang kích hoạt',
                        className: 'text-green-500',
                      }}
                    />
                  ) : (
                    <StatusBadge
                      item={{
                        title: 'Chưa kích hoạt',
                        className: 'text-orange-500',
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <TableAction>
                    <Link
                      className={commonClassName.action}
                      href={`/manage/coupon/update?slug=${coupon.code}`}
                    >
                      <IconEdit />
                    </Link>
                    <ActionDeleteCoupon
                      className={commonClassName.action}
                      code={coupon.code}
                    />
                  </TableAction>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination total={total} totalPages={totalPages} />
    </div>
  )
}

export default CouponManage
