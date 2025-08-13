'use client';
import { debounce } from 'lodash';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getValidateCoupon } from '@/lib/actions/coupon.action';
import { Input } from '@/shared/components/ui/input';
import { ECouponType } from '@/shared/types/enums';

interface ICouponFormProps {
  setCouponId: Dispatch<SetStateAction<string>>;
  originalPrice: number;
  setPrice: Dispatch<SetStateAction<number>>;
  courseId: string;
}

const CouponForm = ({
  courseId,
  originalPrice,
  setCouponId,
  setPrice,
}: ICouponFormProps) => {
  const [isAppliedCoupon, setIsAppliedCoupon] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>('');

  useEffect(() => {
    setIsAppliedCoupon(false);
  }, [couponCode]);

  const handleChangeCoupon = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCouponCode(event?.target?.value);
    },
    300,
  );

  const handleApplyCoupon = async () => {
    if (!couponCode || isAppliedCoupon) return;
    try {
      const hasResult = await getValidateCoupon({
        code: couponCode.toUpperCase(),
        courseId,
      });

      if (hasResult?._id) {
        const couponType = hasResult.type;
        let finalPrice = originalPrice;

        if (couponType === ECouponType.PERCENT) {
          finalPrice = originalPrice - (originalPrice * hasResult?.value) / 100;
        } else if (couponType === ECouponType.AMOUNT) {
          finalPrice = originalPrice - hasResult.value;
        }
        setPrice(finalPrice);
        setIsAppliedCoupon(true);
        setCouponId(hasResult._id);
        toast.success('Áp dụng coupon thành công');
      } else {
        setCouponCode('');
        setCouponId('');
        toast.error('Áp coupon thất bại');
      }
    } catch (error) {
      console.log('Error when apply coupon:', error);
    }
  };

  return (
    <div className="relative mt-5">
      <Input
        className="pr-20 text-sm font-semibold uppercase placeholder:text-sm"
        defaultValue={couponCode}
        placeholder="Nhập mã giảm giá..."
        onChange={handleChangeCoupon}
      />
      <button
        className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium disabled:text-gray-400"
        disabled={!couponCode || isAppliedCoupon}
        type="button"
        onClick={handleApplyCoupon}
      >
        Áp dụng
      </button>
    </div>
  );
};

export default CouponForm;
