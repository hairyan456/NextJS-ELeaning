'use client';
import Link from 'next/link';

import useQueryString from '@/hooks/useQueryString';
import {
  BouncedLink,
  Heading,
  Pagination,
  StatusBadge,
  TableAction,
} from '@/shared/components';
import { IconEdit } from '@/shared/components/icons';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { allValue, commonClassName, couponStatus } from '@/shared/constants';
import { TCouponItem } from '@/types';
import { ECouponType } from '@/types/enums';

import ActionDeleteCoupon from './action-delete-coupon';

const CouponManage = ({
  coupons,
  total,
  totalPages,
}: {
  coupons: TCouponItem[] | undefined;
  totalPages: number;
  total: number;
}) => {
  const { handleChangeQS, handleSearchData } = useQueryString();

  return (
    <div>
      <BouncedLink url="/manage/coupon/new" />
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
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
                  <SelectItem
                    key={status.value}
                    value={status.value + ''}
                  >
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
          {!!coupons &&
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
      <Pagination
        total={total}
        totalPages={totalPages}
      />
    </div>
  );
};

export default CouponManage;
