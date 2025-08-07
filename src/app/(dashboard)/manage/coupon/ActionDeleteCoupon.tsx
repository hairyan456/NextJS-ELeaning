'use client';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { IconDelete } from "@/shared/components/icons";
import { deleteCoupon } from "@/lib/actions/coupon.action";

const ActionDeleteCoupon = ({ code, className }: { code: string, className: string; }) => {

    const handleDeleteCoupon = async (code: string) => {
        if (!code) return;
        try {
            Swal.fire({
                title: "Bạn có chắc muốn xóa mã giảm giá này ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Xóa",
                cancelButtonText: "Hủy bỏ",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteCoupon(code, "/manage/coupon");
                    toast.success("Xóa Coupon thành công");
                }
            });
        } catch (error) {
            console.error("Error when delete Coupon:", error);
        }
    };
    return (
        <button
            className={className}
            onClick={() => handleDeleteCoupon(code)}
        >
            <IconDelete />
        </button>
    );
};

export default ActionDeleteCoupon;