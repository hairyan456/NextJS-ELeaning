'use client';
import { Input } from "@/components/ui/input";
import { getValidateCoupon } from "@/lib/actions/coupon.action";
import { ECouponType } from "@/types/enums";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

const CouponForm = ({ price, setPrice }: { price: number; setPrice: Dispatch<SetStateAction<number>> }) => {
    const [couponCode, setCouponCode] = useState<string>("");

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        try {
            const res = await getValidateCoupon({ code: couponCode.toUpperCase() });
            if (res?._id) {
                const couponType = res.type;
                let finalPrice = price;
                if (couponType === ECouponType.PERCENT) {
                    finalPrice = price - (price * res?.value) / 100;
                }
                else if (couponType === ECouponType.AMOUNT) {
                    finalPrice = price - res.value;
                }
                setPrice(finalPrice);
                setCouponCode("");
                toast.success('Áp dụng coupon thành công');
            }
            else toast.error("Áp coupon thất bại");
        } catch (error) {
            console.log(`Error when apply coupon:`, error);
        }
    }

    return (
        <div className="mt-5 relative">
            <Input
                value={couponCode}
                className="pr-20 uppercase font-semibold text-sm placeholder:text-sm "
                placeholder="Nhập mã giảm giá..."
                onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
                type="button"
                className="absolute right-5 top-1/2 -translate-y-1/2 font-medium text-sm"
                disabled={!couponCode}
                onClick={handleApplyCoupon}
            >
                Áp dụng
            </button>
        </div>
    );
};

export default CouponForm;