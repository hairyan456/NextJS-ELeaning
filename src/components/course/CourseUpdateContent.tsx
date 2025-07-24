'use client';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { commonClassName } from "@/constants";
import { IconCancel, IconCheck, IconDelete, IconEdit } from "../icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createNewLecture, updateLecture } from "@/lib/actions/lecture.action";
import { toast } from "react-toastify";
import { MouseEvent, useState } from "react";
import Swal from "sweetalert2";
import { ILecture } from "@/database/lecture.model";
import { ICourseUpdateParams } from "@/types";
import { cn } from "@/lib/utils";

const CourseUpdateContent = ({ course }: { course: ICourseUpdateParams }) => {
    const lectures = course?.lectures || [];

    const handleAddNewLecture = async () => {
        try {
            const res = await createNewLecture({
                title: "Chương mới",
                course: course._id,
                order: lectures?.length + 1,
                path: `/manage/course/update-content?slug=${course.slug}`,
            });
            if (res?.success) {
                toast.success(res?.message || "Thêm chương mới thành công!");
            }
        } catch (error) {
            console.error("Error adding new lecture:", error);
        }
    };

    const handleDeleteLecture = async (e: MouseEvent<HTMLSpanElement>, lectureId: string) => {
        e?.stopPropagation();
        try {
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
                    const res = await updateLecture({
                        lectureId,
                        updateData: {
                            _destroy: true,
                            path: `/manage/course/update-content?slug=${course.slug}`,
                        },
                    });
                    if (res?.success) {
                        toast.success("Xóa chương thành công!");
                    }
                }
            });
        } catch (error) {
            console.error("Error deleting lecture:", error);
        }

    };

    const handleUpdateLecture = async (e: MouseEvent<HTMLSpanElement>, lectureId: string) => {
        e?.stopPropagation();
        try {
            const res = await updateLecture({
                lectureId,
                updateData: {
                    title: lectureEdit,
                    path: `/manage/course/update-content?slug=${course.slug}`,
                },
            });
            if (res?.success) {
                toast.success("Cập nhật chương thành công!");
                setLectureEdit("");
                setLectureIdEdit("");
            }
        } catch (error) {
            console.error("Error deleting lecture:", error);
        }

    };

    const [lectureEdit, setLectureEdit] = useState<string>('');
    const [lectureIdEdit, setLectureIdEdit] = useState<string>('');

    return (
        <>
            <div className="flex flex-col gap-5">
                {lectures.map((lecture: ILecture, index: number) => (
                    <Accordion key={lecture._id} type="single" collapsible={!lectureIdEdit}>
                        <AccordionItem value={lecture._id}>
                            <AccordionTrigger>
                                <div className="flex items-center gap-3 justify-between w-full pr-5">
                                    {lecture._id === lectureIdEdit ?
                                        <>
                                            <div className="w-full">
                                                <Input
                                                    placeholder="Tên chương..."
                                                    defaultValue={lecture?.title}
                                                    onChange={(e) => {
                                                        setLectureEdit(e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <span className={cn(commonClassName.action, "text-green-500")}
                                                    onClick={(e) => handleUpdateLecture(e, lecture?._id)}
                                                >
                                                    <IconCheck />
                                                </span>
                                                <span className={cn(commonClassName.action, "text-red-500")}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setLectureIdEdit("");
                                                    }}
                                                >
                                                    <IconCancel />
                                                </span>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div>{lecture?.title}</div>
                                            <div className="flex gap-2">
                                                <span className={cn(commonClassName.action, "text-blue-500")} onClick={(e) => {
                                                    e.stopPropagation();
                                                    setLectureIdEdit(lecture?._id);
                                                }}>
                                                    <IconEdit />
                                                </span>
                                                <span className={cn(commonClassName.action, "text-red-500")}
                                                    onClick={(e) => handleDeleteLecture(e, lecture?._id)}
                                                >
                                                    <IconDelete />
                                                </span>
                                            </div>
                                        </>
                                    }


                                </div>
                            </AccordionTrigger>
                            <AccordionContent>

                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                ))}
            </div>

            <Button onClick={() => handleAddNewLecture()} className="text-white mt-5 ">Thêm chương mới</Button>
        </>
    );
};

export default CourseUpdateContent;