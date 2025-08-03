import { getAllCoupons } from "@/lib/actions/coupon.action";
import CouponManage from "./CouponManage";


const page = async ({ searchParams }: { searchParams: { page: number; search: string; active: boolean } }) => {
    const coupons = await getAllCoupons({
        page: searchParams.page || 1, limit: 10, search: searchParams.search, active: searchParams.active
    });

    return (
        <>
            <CouponManage coupons={coupons} />
        </>
    );
};

export default page;