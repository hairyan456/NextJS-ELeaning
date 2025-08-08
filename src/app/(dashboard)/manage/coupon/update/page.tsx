import { Heading } from '@/shared/components'
import React from 'react'
import UpdateCouponForm from './UpdateCouponForm'
import PageNotFound from '@/app/not-found'
import { getCouponByCode } from '@/lib/actions/coupon.action'

const page = async ({ searchParams }: { searchParams: { slug: string } }) => {
  if (!searchParams.slug) return <PageNotFound />

  const couponDetail = await getCouponByCode({ code: searchParams.slug })

  if (!couponDetail?._id) return <PageNotFound />
  return (
    <div>
      <Heading className="mb-10">Cập nhật mã giảm giá</Heading>
      <UpdateCouponForm data={couponDetail} />
    </div>
  )
}

export default page
