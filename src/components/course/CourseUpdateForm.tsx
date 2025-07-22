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

const formSchema = z.object({
    title: z.string().min(10, "Tên khóa học phải có ít nhất 10 ký tự").max(100, "Tên khóa học không được quá 100 ký tự"),
    slug: z.string().optional(),
    price: z.number().int().positive().optional(),
    sale_price: z.number().int().positive().optional(),
    intro_url: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    views: z.number().int().positive().optional(),
    status: z.enum([ECourseStatus.APPROVE, ECourseStatus.PENDING, ECourseStatus.REJECTED]).optional(),
    level: z.enum([ECourseLevel.ADVANCED, ECourseLevel.BEGINNER, ECourseLevel.INTERMEDIATE]).optional(),
    info: z.object({
        requirements: z.array(z.string()).optional(),
        benefits: z.array(z.string()).optional(),
        qa: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    }),
})

const CourseUpdateForm = () => {
    const [isLoadingSubmit, setLoadingSubmit] = useState(false);
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            slug: "",
            price: 0,
            sale_price: 0,
            intro_url: "",
            description: "",
            image: "",
            views: 0,
            status: ECourseStatus.PENDING,
            level: ECourseLevel.BEGINNER,
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoadingSubmit(true);
        try {

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
                                    <Input placeholder="199.000" {...field} />
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
                                    <Input placeholder="499.000" {...field} />
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
                                    <Input type="number" placeholder="100" {...field} />
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
                                <FormLabel>Yêu cầu</FormLabel>
                                <FormControl>
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
                                <FormLabel>Lợi ích</FormLabel>
                                <FormControl>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="info.qa"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Question/Answer</FormLabel>
                                <FormControl>
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