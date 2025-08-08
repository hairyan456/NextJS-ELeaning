import { fetchOrders } from '@/lib/actions/order.action'
import { ITEMS_PER_PAGE } from '@/shared/constants'
import OrderManagePage from '@/modules/order/pages/order-manage-page'
import { OrderManagePageParams } from '@/modules/order/types/order.types'

const page = async ({ searchParams }: OrderManagePageParams) => {
  const data = await fetchOrders({
    page: searchParams.page || 1,
    limit: ITEMS_PER_PAGE,
    search: searchParams.search,
    status: searchParams.status,
  })
  if (!data) return null
  const { orders, total } = data
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return (
    <OrderManagePage
      orders={orders ? JSON.parse(JSON.stringify(orders)) : []}
      total={total}
      totalPages={totalPages}
    />
  )
}

export default page
