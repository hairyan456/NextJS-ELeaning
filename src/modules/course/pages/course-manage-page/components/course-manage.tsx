'use client';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { ICourse } from '@/database/course.model';
import { updateCourse } from '@/lib/actions/course.action';
import { cn } from '@/lib/utils';
import { BouncedLink, Heading } from '@/shared/components';
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
import { allValue, commonClassName, courseStatus } from '@/shared/constants';
import useQueryString from '@/shared/hooks/use-query-string';
import { ECourseStatus } from '@/shared/types/enums';

import {
  IconDelete,
  IconEye,
  IconStudy,
} from '../../../../../shared/components/icons';
import IconEdit from '../../../../../shared/components/icons/icon-edit';

const CourseManage = ({ courses }: { courses: ICourse[] }) => {
  const { handleSearchData, handleSelectStatus } = useQueryString();

  const handleDeleteCourse = async (slug: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status: ECourseStatus.PENDING,
            _destroy: true,
          },
          path: '/manage/course',
        });
        toast.success('Xóa khóa học thành công');
      }
    });
  };

  const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
    try {
      Swal.fire({
        title: 'Bạn có chắc muốn đổi trạng thái ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cập nhật',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status:
                status === ECourseStatus.PENDING
                  ? ECourseStatus.APPROVED
                  : ECourseStatus.PENDING,
              _destroy: false,
            },
            path: '/manage/course',
          });
          toast.success('Cập nhật trạng thái thành công');
          // router.push(`${pathname}?${createQueryString('status', "")}`);
        }
      });
    } catch (error) {
      console.error('Error changing course status:', error);
    }
  };

  // useEffect(() => {
  //     router.push(`${pathname}?${createQueryString('page', page.toString())}`);
  // }, [page]);

  return (
    <>
      <BouncedLink url="/manage/course/new" />
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <Heading className="uppercase">Quản lý khóa học</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm khóa học..."
              onChange={handleSearchData}
            />
          </div>
          <Select
            defaultValue={allValue}
            onValueChange={(value) =>
              handleSelectStatus(value as ECourseStatus)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {courseStatus.map((status) => (
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
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses?.length > 0 &&
            courses.map((course) => (
              <TableRow key={course.slug}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      alt=""
                      className="size-16 shrink-0 rounded-lg object-cover"
                      height={100}
                      src={course.image}
                      width={100}
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="whitespace-nowrap text-sm font-bold lg:text-base">
                        {course.title}
                      </h3>
                      <h4 className="text-xs text-slate-500 lg:text-sm">
                        {new Date(course.created_at).toLocaleDateString(
                          'vi-VN',
                        )}
                      </h4>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-bold lg:text-base">
                    {course.price.toLocaleString()}đ
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    className={cn(
                      commonClassName.status,
                      courseStatus.find(
                        (status) => status.value === course.status,
                      )?.className,
                    )}
                    onClick={() =>
                      handleChangeStatus(course.slug, course.status)
                    }
                  >
                    {
                      courseStatus.find(
                        (status) => status.value === course.status,
                      )?.title
                    }
                  </button>
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <Link
                      className={commonClassName.action}
                      href={`/course/${course.slug}`}
                      target="_blank"
                    >
                      <IconEye />
                    </Link>
                    <Link
                      className={commonClassName.action}
                      href={`/manage/course/update?slug=${course.slug}`}
                    >
                      <IconEdit />
                    </Link>
                    <button
                      className={commonClassName.action}
                      onClick={() => handleDeleteCourse(course.slug)}
                    >
                      <IconDelete />
                    </button>
                    <Link
                      className={commonClassName.action}
                      href={`/manage/course/update-content?slug=${course.slug}`}
                    >
                      <IconStudy />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {/* Paginate */}
    </>
  );
};

export default CourseManage;
