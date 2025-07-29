"use client";
import { ILesson } from '@/database/lesson.model';
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";;
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { updateLesson } from '@/lib/actions/lesson.action';
import { Editor } from '@tinymce/tinymce-react';
import { editorOptions } from '@/constants';
import { useTheme } from 'next-themes';

const formSchema = z.object({
    slug: z.string().optional(),
    duration: z.number().optional(),
    video_url: z.string().optional(),
    content: z.string().optional(),

});

const LessonItemUpdate = ({ lesson }: { lesson: ILesson }) => {
    const editorRef = useRef<any>(null);
    const [isLoadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            slug: lesson.slug,
            duration: lesson.duration,
            video_url: lesson.video_url,
            content: lesson.content || '',
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoadingSubmit(true);
        try {
            const res = await updateLesson({
                lessonId: lesson._id,
                updateData: values,
            });
            if (res?.success) {
                toast.success("Cập nhật bài học thành công");
            }
        } catch (error) {
            console.error("Error update lesson", error);
        }
        finally {
            setLoadingSubmit(false);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (editorRef.current)
                editorRef.current.setContent(lesson.content || '');
        }, 1000)
    }, [lesson.content]);

    const { theme } = useTheme();
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className='grid grid-cols-2 gap-8'>
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Đường dẫn</FormLabel>
                                    <FormControl>
                                        <Input placeholder="bai-1-tong-quan" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thời lượng</FormLabel>
                                    <FormControl>
                                        <Input placeholder="bai-1-tong-quan" {...field}
                                            onChange={e => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="video_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Video URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://youtube.com/abc" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className='col-start-1 col-end-3'>
                                    <FormLabel>Nội dung</FormLabel>
                                    <FormControl>
                                        <Editor
                                            apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                                            onInit={(_evt: Event, editor) => {
                                                (editorRef.current = editor)?.setContent(lesson.content || '');
                                            }}
                                            {...editorOptions(field, theme)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>


                            )}
                        />
                    </div>

                    <div className="flex justify-end gap-5 items-center mt-5">
                        <Button
                            type='submit'
                            className='text-white'
                            isLoading={isLoadingSubmit}
                            disabled={isLoadingSubmit}
                        >
                            Cập nhật
                        </Button>
                        <Link href={'/'} className='text-sm text-slate-600'>Xem trước</Link>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default LessonItemUpdate;