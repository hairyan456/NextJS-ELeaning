import PageNotFound from '@/app/not-found'
import { getOrderDetail } from '@/lib/actions/order.action'

const page = async ({ params }: { params: { code: string } }) => {
  const orderDetail = await getOrderDetail({ code: params.code })
  if (!orderDetail?._id) return <PageNotFound />
  return (
    <div>
      <p className="tracking-wide">
        Cảm ơn bạn đã tin tưởng và mua khóa học{' '}
        <strong className="text-primary">{orderDetail?.course?.title}</strong>{' '}
        với số tiền là{' '}
        <strong className="text-primary">
          {orderDetail?.total?.toLocaleString()}đ
        </strong>
      </p>
      <p>
        Vui lòng thanh toán theo thông tin tài khoản dưới đây với nội dung:{' '}
        <strong className="text-primary">{orderDetail?.code}</strong>
      </p>
    </div>
  )
}

export default page
