'use client';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import useQueryString from '@/hooks/useQueryString';
import { deleteRating, updateRating } from '@/lib/actions/rating.action';
import {
  Heading,
  Pagination,
  StatusBadge,
  TableAction,
  TableActionItem,
} from '@/shared/components';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { allValue, ratingList, ratingStatus } from '@/shared/constants';
import { TRatingItem } from '@/types';
import { ERatingStatus } from '@/types/enums';

const RatingManage = ({
  ratings,
  total,
  totalPages,
}: {
  ratings: TRatingItem[];
  totalPages: number;
  total: number;
}) => {
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
      title: 'Bạn có muốn xóa đánh giá này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteRating(id);
        toast.success('Xóa đánh giá thành công');
      }
    });
  };

  return (
    <>
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <Heading className="">Quản lý đánh giá</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm đánh giá..."
              onChange={handleSearchData}
            />
          </div>
          <Select
            defaultValue={allValue}
            onValueChange={(value) =>
              handleSelectStatus(value as ERatingStatus)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {ratingStatus.map((status) => (
                  <SelectItem
                    key={status.value}
                    value={status.value}
                  >
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
          {ratings.length > 0 &&
            ratings.map((r: TRatingItem) => {
              const ratingStatusItem = ratingStatus.find(
                (item) => item.value === r.status,
              );
              const icon = ratingList.find(
                (item) => item.value === r.rate,
              )?.title;

              return (
                <TableRow key={r.rate}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <strong>{r.content}</strong>
                        <Image
                          alt=""
                          height={20}
                          src={`/rating/${icon}.png`}
                          width={20}
                        />
                      </div>
                      <time>
                        {new Date(r.created_at).toLocaleDateString('vi-Vi')}
                      </time>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="font-semibold hover:text-primary"
                      href={`/course/${r.course.slug}`}
                      target="_blank"
                    >
                      {r.course.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <strong>{r.user.name}</strong>
                  </TableCell>
                  <TableCell>
                    <StatusBadge item={ratingStatusItem} />
                  </TableCell>
                  <TableCell>
                    <TableAction>
                      {r.status === ERatingStatus.UNACTIVE && (
                        <TableActionItem
                          type="approve"
                          onClick={() => handleUpdateRating(r._id)}
                        />
                      )}
                      <TableActionItem
                        type="delete"
                        onClick={() => handleDeleteRating(r._id)}
                      />
                    </TableAction>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {/* Paginate */}
      <Pagination
        total={total}
        totalPages={totalPages}
      />
    </>
  );
};

export default RatingManage;
