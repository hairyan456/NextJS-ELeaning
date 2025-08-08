'use client'

import { Button } from '@/shared/components/ui/button'
import { IUser } from '@/database/user.model'
import { createNewOrder } from '@/lib/actions/order.action'
import { createOrderCode } from '@/utils'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const ButtonEnroll = ({
  user,
  courseId,
  amount,
  coupon,
}: {
  user: IUser | null | undefined
  courseId: string
  amount: number
  coupon: string
}) => {
  const router = useRouter()
  const handleEnrollCourse = async () => {
    if (!user?._id) {
      toast.error('Vui lòng đăng nhập để mua khóa học')
      return
    }
    // handle when login
    // create new order with `DH-` + current time
    const newOrder = await createNewOrder({
      code: createOrderCode(),
      user: user._id,
      course: courseId,
      total: amount,
      amount: amount,
      coupon,
    })
    if (newOrder?._id) {
      router.push(`/order/${newOrder?.code}`)
      return
    }
  }

  return (
    <Button className="w-full" variant={'primary'} onClick={handleEnrollCourse}>
      Mua khóa học
    </Button>
  )
}

export default ButtonEnroll
