'use client';
import { Input } from "@/components/ui/input";
import { getValidateCoupon } from "@/lib/actions/coupon.action";
import { ECouponType } from "@/types/enums";
import { debounce } from "lodash";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const CouponForm = ({ setCouponId, originalPrice, setPrice, courseId }:
    {
        setCouponId: Dispatch<SetStateAction<any>>; originalPrice: number;
        setPrice: Dispatch<SetStateAction<number>>; courseId: string;
    }
) => {
    const [isAppliedCoupon, setIsAppliedCoupon] = useState<boolean>(false);
    const [couponCode, setCouponCode] = useState<string>("");

    useEffect(() => {
        setIsAppliedCoupon(false);
    }, [couponCode]);

    const handleChangeCoupon = debounce((e: any) => {
        setCouponCode(e?.target?.value);
    }, 300);

    const handleApplyCoupon = async () => {
        if (!couponCode || isAppliedCoupon) return;
        try {
            const res = await getValidateCoupon({ code: couponCode.toUpperCase(), courseId });
            if (res?._id) {
                const couponType = res.type;
                let finalPrice = originalPrice;
                if (couponType === ECouponType.PERCENT) {
                    finalPrice = originalPrice - (originalPrice * res?.value) / 100;
                }
                else if (couponType === ECouponType.AMOUNT) {
                    finalPrice = originalPrice - res.value;
                }
                setPrice(finalPrice);
                setIsAppliedCoupon(true);
                setCouponId(res._id);
                toast.success('Áp dụng coupon thành công');
            }
            else {
                setCouponCode("");
                setCouponId("");
                toast.error("Áp coupon thất bại");
            };
        } catch (error) {
            console.log(`Error when apply coupon:`, error);
        }
    }

    return (
        <div className="mt-5 relative">
            <Input
                defaultValue={couponCode}
                className="pr-20 uppercase font-semibold text-sm placeholder:text-sm "
                placeholder="Nhập mã giảm giá..."
                onChange={handleChangeCoupon}
            />
            <button
                type="button"
                className="absolute right-5 top-1/2 -translate-y-1/2 font-medium text-sm disabled:text-gray-400"
                disabled={!couponCode || isAppliedCoupon}
                onClick={handleApplyCoupon}
            >
                Áp dụng
            </button>
        </div>
    );
};

export default CouponForm;