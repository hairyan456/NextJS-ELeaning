"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { vi } from "zod/locales";
import { useState } from "react"
import slugify from "slugify";
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Textarea } from "../ui/textarea"
import { ECourseLevel, ECourseStatus } from "@/types/enums"
import { updateCourse } from "@/lib/actions/course.action"
import { ICourse } from "@/database/course.model";
import { useImmer } from 'use-immer';
import { IconAdd } from "../icons"

const formSchema = z.object({
    title: z.string().min(10, "Tên khóa học phải có ít nhất 10 ký tự").max(100, "Tên khóa học không được quá 100 ký tự"),
    slug: z.string().optional(),
    price: z.number().int().positive().optional(),
    sale_price: z.number().int().positive().optional(),
    intro_url: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    views: z.number().int().optional(),
    status: z.enum([ECourseStatus.APPROVE, ECourseStatus.PENDING, ECourseStatus.REJECTED]).optional(),
    level: z.enum([ECourseLevel.ADVANCED, ECourseLevel.BEGINNER, ECourseLevel.INTERMEDIATE]).optional(),
    info: z.object({
        requirements: z.array(z.string()).optional(),
        benefits: z.array(z.string()).optional(),
        qa: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    }),
})

const CourseUpdateForm = ({ data }: { data: ICourse }) => {
    const [isLoadingSubmit, setLoadingSubmit] = useState(false);
    const router = useRouter();
    const [courseInfo, setCourseInfo] = useImmer({
        requirements: data.info?.requirements || [],
        benefits: data.info?.benefits || [],
        qa: data.info?.qa || [],
    });

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: data.title,
            slug: data.slug,
            price: data.price,
            sale_price: data.sale_price,
            intro_url: data.intro_url,
            description: data.description,
            image: data.image,
            views: data.views,
            status: data.status,
            level: data.level,
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoadingSubmit(true);
        try {
            const res = await updateCourse({
                slug: data.slug,
                updateData: {
                    title: values.title,
                    slug: values.slug,
                    price: values.price,
                    sale_price: values.sale_price,
                    intro_url: values.intro_url,
                    description: values.description,
                    views: values.views,
                    info: {
                        requirements: courseInfo.requirements,
                        benefits: courseInfo.benefits,
                        qa: courseInfo.qa,
                    }
                }
            });
            if (!res?.success) {
                toast.error(res?.message || "Cập nhật khóa học thất bại");
                return;
            }
            else {
                if (values.slug)
                    router.replace(`/manage/course/update?slug=${values.slug}`);

                toast.success(res?.message || "Cập nhật khóa học thành công");
            }
        } catch (error) {
            console.error("Error update course:", error);
        }
        finally {
            setLoadingSubmit(false);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
                <div className="grid grid-cols-2 gap-8 my-10">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên khóa học *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tên khóa học" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Đường dẫn khóa học</FormLabel>
                                <FormControl>
                                    <Input placeholder="khoa-hoc-lap-trinh" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Giá khuyến mãi</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="199.000"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sale_price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Giá gốc</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="499.000"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mô tả khóa học</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Nhập mô tả khóa học"
                                        {...field}
                                        className="h-[200px]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ảnh đại diện</FormLabel>
                                <FormControl>
                                    <div className="h-[200px] bg-white rounded-md border border-gray-200">

                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="intro_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Youtube URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://youtube.com/xyz" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="views"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lượt xem</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="100" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Trạng thái</FormLabel>
                                <FormControl>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Trình độ</FormLabel>
                                <FormControl>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="info.requirements"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center justify-between gap-5">
                                    <span>Yêu cầu</span>
                                    <button
                                        type="button"
                                        className="text-primary"
                                        onClick={() => {
                                            setCourseInfo((draft) => {
                                                draft.requirements.push("");
                                            })
                                        }}
                                    >
                                        <IconAdd className="size-5" />
                                    </button>
                                </FormLabel>
                                <FormControl>
                                    <>
                                        {courseInfo.requirements.map((item, index) => (
                                            <Input
                                                value={item}
                                                key={index}
                                                placeholder={`Yêu cầu ${index + 1}`}
                                                onChange={(e) => {
                                                    setCourseInfo((draft) => {
                                                        draft.requirements[index] = e.target.value;
                                                    })
                                                }}
                                            />
                                        ))}
                                    </>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="info.benefits"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center justify-between gap-5">
                                    <span>Lợi ích</span>
                                    <button
                                        type="button"
                                        className="text-primary"
                                        onClick={() => {
                                            setCourseInfo((draft) => {
                                                draft.benefits.push("");
                                            })
                                        }}
                                    >
                                        <IconAdd className="size-5" />
                                    </button>
                                </FormLabel>
                                <FormControl>
                                    <>
                                        {courseInfo.benefits.map((item, index) => (
                                            <Input
                                                value={item}
                                                key={index}
                                                placeholder={`Lợi ích ${index + 1}`}
                                                onChange={(e) => {
                                                    setCourseInfo((draft) => {
                                                        draft.benefits[index] = e.target.value;
                                                    })
                                                }}
                                            />
                                        ))}
                                    </>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="info.qa"
                        render={({ field }) => (
                            <FormItem className="col-start-1 col-end-3">
                                <FormLabel className="flex items-center justify-between gap-5">
                                    <span>Q&A</span>
                                    <button
                                        type="button"
                                        className="text-primary"
                                        onClick={() => {
                                            setCourseInfo((draft) => {
                                                draft.qa.push({
                                                    question: "",
                                                    answer: ""
                                                });
                                            })
                                        }}
                                    >
                                        <IconAdd className="size-5" />
                                    </button>
                                </FormLabel>
                                <FormControl>
                                    <>
                                        {courseInfo.qa.map((item, index) => (
                                            <div className="grid grid-cols-2 gap-5" key={index}>
                                                <Input
                                                    value={item.question}
                                                    key={index}
                                                    placeholder={`Câu hỏi ${index + 1}`}
                                                    onChange={(e) => {
                                                        setCourseInfo((draft) => {
                                                            draft.qa[index].question = e.target.value;
                                                        })
                                                    }}
                                                />
                                                <Input
                                                    value={item.answer}
                                                    key={index}
                                                    placeholder={`Câu trả lời ${index + 1}`}
                                                    onChange={(e) => {
                                                        setCourseInfo((draft) => {
                                                            draft.qa[index].answer = e.target.value;
                                                        })
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    isLoading={isLoadingSubmit}
                    variant={'primary'}
                    type="submit"
                    className="w-40"
                    disabled={isLoadingSubmit}
                >
                    Cập nhật khóa học
                </Button>
            </form>
        </Form>
    );
};

export default CourseUpdateForm;