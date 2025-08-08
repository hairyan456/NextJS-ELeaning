'use client'
import { IconCancel, IconCheck } from '@/shared/components/icons'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
import { allValue, commonClassName, orderStatus } from '@/shared/constants'
import useQueryString from '@/hooks/useQueryString'
import { updateOrder } from '@/lib/actions/order.action'
import { cn } from '@/lib/utils'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { IOrderManageProps } from '../types/order.types'
import {
  EmptySpace,
  Heading,
  Pagination,
  StatusBadge,
} from '@/shared/components'
import { Input } from '@/shared/components/ui/input'
import { EOrderStatus } from '@/shared/types/enum'

const OrderManagePage = ({
  orders = [],
  totalPages = 1,
  total,
}: IOrderManageProps) => {
  const { handleSearchData, handleSelectStatus } = useQueryString()

  const handleUpdateOrder = async ({
    orderId,
    status,
  }: {
    orderId: string
    status: EOrderStatus
  }) => {
    if (status === EOrderStatus.CANCELED) {
      Swal.fire({
        title: 'Bạn có chắc muốn hủy đơn hàng không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Thoát',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateOrder({ orderId, status }) // Replace with actual order ID
        }
      })
    }
    if (status === EOrderStatus.COMPLETED) {
      const res = await updateOrder({ orderId, status })
      if (res?.success) {
        toast.success('Cập nhật đơn hàng thành công')
        return
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading className="">Quản lý đơn hàng</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm đơn hàng..."
              onChange={(e) => handleSearchData(e)}
            />
          </div>
          <Select
            defaultValue={allValue}
            onValueChange={(value) => handleSelectStatus(value as EOrderStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {orderStatus.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
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
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Khóa học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Số tiền</TableHead>
            <TableHead>Mã giảm giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.length <= 0 && <EmptySpace />}
          {orders?.length > 0 &&
            orders.map((order) => {
              const orderStatusItem = orderStatus.find(
                (item) => item.value === order.status,
              )
              return (
                <TableRow key={order.code}>
                  <TableCell>
                    <strong>{order.code}</strong>
                  </TableCell>
                  <TableCell>{order.course.title}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <span>{order.amount.toLocaleString('us-US')}</span>
                      {order.discount > 0 && (
                        <span>{order.discount.toLocaleString('us-US')}</span>
                      )}
                      <strong
                        className={cn(
                          orderStatusItem?.className,
                          'bg-transparent',
                        )}
                      >
                        {order.total.toLocaleString('us-US')}
                      </strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <b className="text-primary font-bold">
                      {order?.coupon?.code || ''}
                    </b>
                  </TableCell>
                  <TableCell>
                    <StatusBadge item={orderStatusItem}></StatusBadge>
                  </TableCell>
                  <TableCell>
                    {order.status !== EOrderStatus.CANCELED && (
                      <div className="flex gap-3">
                        {order.status === EOrderStatus.PENDING && (
                          <button
                            className={commonClassName.action}
                            type="button"
                            disabled={
                              order.status.toString() ===
                              EOrderStatus.CANCELED.toString()
                            }
                            onClick={() =>
                              handleUpdateOrder({
                                orderId: order._id,
                                status: EOrderStatus.COMPLETED,
                              })
                            }
                          >
                            <IconCheck />
                          </button>
                        )}
                        <button
                          className={commonClassName.action}
                          type="button"
                          disabled={
                            order.status.toString() ===
                            EOrderStatus.CANCELED.toString()
                          }
                          onClick={() =>
                            handleUpdateOrder({
                              orderId: order._id,
                              status: EOrderStatus.CANCELED,
                            })
                          }
                        >
                          <IconCancel />
                        </button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
      <Pagination total={total} totalPages={totalPages} />
    </div>
  )
}

export default OrderManagePage
