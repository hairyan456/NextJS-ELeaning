'use client';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Heading from "../typography/Heading";
import Image from "next/image";
import { commonClassName, courseStatus } from "@/constants";
import { cn } from "@/lib/utils";
import IconEdit from "../icons/IconEdit";
import { IconDelete, IconEye, IconStudy } from "../icons";
import Link from "next/link";
import Swal from "sweetalert2";
import { ICourse } from "@/database/course.model";
import { updateCourse } from "@/lib/actions/course.action";
import { ECourseStatus } from "@/types/enums";
import { toast } from "react-toastify";
import { Input } from "../ui/input";


const CourseManage = ({ courses }: { courses: ICourse[] }) => {
    const handleDeleteCourse = async (slug: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await updateCourse({
                    slug,
                    updateData: {
                        status: ECourseStatus.PENDING,
                        _destroy: true
                    },
                    path: '/manage/course',
                });
                toast.success("Xóa khóa học thành công");
            }
        });
    };

    const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, update it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await updateCourse({
                        slug,
                        updateData: {
                            status: ECourseStatus.PENDING ? ECourseStatus.APPROVED : ECourseStatus.PENDING,
                            _destroy: false,
                        },
                        path: '/manage/course',
                    });
                    toast.success("Cập nhật trạng thái thành công");
                }
            });
        } catch (error) {
            console.error("Error changing course status:", error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-10">
                <Heading className="uppercase">Quản lý khóa học</Heading>
                <div className="w-[300px]">
                    <Input placeholder="Tìm kiếm khóa học..." />
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Thông tin</TableHead>
                        <TableHead>Giá</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses?.length > 0 && courses.map((course) => (
                        <TableRow key={course.slug}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Image
                                        alt=""
                                        src={course.image}
                                        width={100}
                                        height={100}
                                        className="flex-shrink-0 size-16 rounded-lg object-cover"
                                    />
                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-bold text-base">{course.title}</h3>
                                        <h4 className="text-sm text-slate-500">
                                            {new Date(course.created_at).toLocaleDateString("vi-VN")}
                                        </h4>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="font-bold text-base ">{course.price.toLocaleString()}đ</span>
                            </TableCell>
                            <TableCell>
                                <button
                                    type="button"
                                    onClick={() => handleChangeStatus(course.slug, course.status)}
                                    className={cn(
                                        commonClassName.status,
                                        courseStatus.find(status => status.value === course.status)?.className
                                    )}
                                >
                                    {courseStatus.find(status => status.value === course.status)?.title}
                                </button>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-3">
                                    <Link href={`/course/${course.slug}`} target="_blank" className={commonClassName.action}>
                                        <IconEye />
                                    </Link>
                                    <Link href={`/manage/course/update?slug=${course.slug}`} className={commonClassName.action}>
                                        <IconEdit />
                                    </Link>
                                    <button onClick={() => handleDeleteCourse(course.slug)} className={commonClassName.action}>
                                        <IconDelete />
                                    </button>
                                    <Link href={`/manage/course/update-content?slug=${course.slug}`} className={commonClassName.action}>
                                        <IconStudy />
                                    </Link>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
            {/* Paginate */}
            <div className="flex justify-end gap-3 mt-5">
                <button className={commonClassName.paginationButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <button className={commonClassName.paginationButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </button>
            </div>
        </>
    );
};

export default CourseManage;