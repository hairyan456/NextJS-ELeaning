import { BouncedLink, StatusBadge, TableAction } from "@/components/common";
import PaginationButton from "@/components/common/PaginationButton";
import { IconEdit } from "@/components/icons";
import Heading from "@/components/typography/Heading";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { commonClassName } from "@/constants";
import { getAllCoupons } from "@/lib/actions/coupon.action";
import { ECouponType } from "@/types/enums";
import Link from "next/link";
import ActionDeleteCoupon from "./ActionDeleteCoupon";

const page = async () => {
    const coupons = await getAllCoupons({});

    return (
        <div>
            <BouncedLink url="/manage/coupon/new"></BouncedLink>
            <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
                <Heading className="">Quản lý mã giảm giá</Heading>
                <div className="flex gap-3">
                    <div className="w-full lg:w-[300px]">
                        <Input placeholder="Tìm kiếm coupon..." />
                    </div>
                </div>
            </div>
            <Table className="table-responsive">
                <TableHeader>
                    <TableRow>
                        <TableHead>Mã</TableHead>
                        <TableHead>Tiêu đề</TableHead>
                        <TableHead>Giảm giá</TableHead>
                        <TableHead>Sử dụng</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {coupons && coupons.length > 0 && coupons.map((coupon) => (
                        <TableRow key={coupon.code}>
                            <TableCell>
                                <strong>{coupon.code}</strong>
                            </TableCell>
                            <TableCell>
                                <strong className="text-primary">{coupon.title}</strong>
                            </TableCell>
                            <TableCell>
                                {coupon.type === ECouponType.AMOUNT ? <>{coupon.value.toLocaleString()}</>
                                    :
                                    <>{coupon.value} %</>
                                }
                            </TableCell>
                            <TableCell>
                                <>{coupon.used}/{coupon.limit}</>
                            </TableCell>
                            <TableCell>
                                {coupon.active ? <StatusBadge item={{ title: "Đang hoạt động", className: 'text-green-500' }} />
                                    : <StatusBadge item={{ title: "Chưa kích hoạt", className: 'text-orange-500' }} />
                                }
                            </TableCell>
                            <TableCell>
                                <TableAction>
                                    <Link
                                        href={`/manage/coupon/update?slug=${coupon.code}`}
                                        className={commonClassName.action}
                                    >
                                        <IconEdit />
                                    </Link>
                                    <ActionDeleteCoupon
                                        code={coupon.code}
                                        className={commonClassName.action}
                                    />
                                </TableAction>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <PaginationButton />
        </div >
    );
};

export default page;