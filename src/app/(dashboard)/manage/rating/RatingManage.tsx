"use client";
import { StatusBadge, TableAction } from "@/components/common";
import Pagination from "@/components/common/Pagination";
import TableActionItem from "@/components/common/TableActionItem";
import Heading from "@/components/typography/Heading";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { allValue, ratingList, ratingStatus } from "@/constants";
import useQueryString from "@/hooks/useQueryString";
import { deleteRating, updateRating } from "@/lib/actions/rating.action";
import { TRatingItem } from "@/types";
import { ERatingStatus } from "@/types/enums";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const RatingManage = ({ ratings, totalPages, total }: { ratings: TRatingItem[]; totalPages: number; total: number; }) => {
    const { handleSearchData, handleSelectStatus } = useQueryString();

    const handleUpdateRating = async (id: string) => {
        try {
            await updateRating(id);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteRating = async (id: string) => {
        Swal.fire({
            title: "Bạn có muốn xóa đánh giá này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteRating(id);
                toast.success("Xóa đánh giá thành công");
            }
        });
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
                <Heading className="">Quản lý đánh giá</Heading>
                <div className="flex gap-3">
                    <div className="w-full lg:w-[300px]">
                        <Input
                            placeholder="Tìm kiếm đánh giá..."
                            onChange={handleSearchData}
                        />
                    </div>
                    <Select
                        onValueChange={(value) => handleSelectStatus(value as ERatingStatus)}
                        defaultValue={allValue}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={allValue}>
                                    Tất cả
                                </SelectItem>
                                {ratingStatus.map((status) => (
                                    <SelectItem value={status.value} key={status.value}>
                                        {status.title}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Table className="table-responsive">
                <TableHeader>
                    <TableRow>
                        <TableHead>Tiêu đề</TableHead>
                        <TableHead>Khóa học</TableHead>
                        <TableHead>Thành viên</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ratings.length > 0 && ratings.map((r: TRatingItem) => {
                        const ratingStatusItem = ratingStatus.find((item) => item.value === r.status);
                        const icon = ratingList.find(item => item.value === r.rate)?.title;
                        return (
                            <TableRow key={r.rate}>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <strong>{r.content}</strong>
                                            <Image width={20} height={20} alt="" src={`/rating/${icon}.png`} />
                                        </div>
                                        <time>{new Date(r.created_at).toLocaleDateString("vi-Vi")}</time>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Link target="_blank" className="font-semibold hover:text-primary" href={`/course/${r.course.slug}`}>{r.course.title}</Link>
                                </TableCell>
                                <TableCell>
                                    <strong>{r.user.name}</strong>
                                </TableCell>
                                <TableCell>
                                    <StatusBadge item={ratingStatusItem} />
                                </TableCell>
                                <TableCell>
                                    <TableAction>
                                        {r.status === ERatingStatus.UNACTIVE &&
                                            <TableActionItem type="approve" onClick={() => handleUpdateRating(r._id)} />
                                        }
                                        <TableActionItem type="delete" onClick={() => handleDeleteRating(r._id)} />
                                    </TableAction>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            {/* Paginate */}
            <Pagination
                totalPages={totalPages}
                total={total}
            />
        </>
    );
};

export default RatingManage;