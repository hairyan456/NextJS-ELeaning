'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { createNewComment } from '@/modules/comment/services/comment.action';
import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form';
import { Textarea } from '@/shared/components/ui/textarea';
import { ICommentItem } from '@/shared/types';

const formSchema = z.object({
  content: z
    .string({ message: 'Vui lòng nhập bình luận' })
    .min(10, { message: 'Comment must be at least 10 characters long.' }),
});

interface CommentFormProps {
  lessonId: string;
  userId: string;
  comment?: ICommentItem;
  isReply?: boolean;
  closeReply?: () => void;
}

const CommentForm = ({
  closeReply = () => {},
  comment,
  isReply,
  lessonId,
  userId,
}: CommentFormProps) => {
  const [isPending, startTransition] = useTransition();
  const pathName = usePathname();
  const slug = useSearchParams().get('slug');
  const path = `${pathName}?slug=${slug}`;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const hasComment = await createNewComment({
        content: values.content,
        lesson: lessonId,
        user: userId,
        level: comment && comment?.level >= 0 ? comment?.level + 1 : 0,
        parentId: comment?._id,
        path,
      });

      if (hasComment) {
        toast.success('Đăng bình luận thành công');
        form.setValue('content', '');
        closeReply?.();
      } else {
        toast.error('Đăng bình luận thất bại');
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          autoComplete="off"
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className={`${isReply ? 'min-h-[100px]' : 'min-h-[150px]'}`}
                    placeholder="Nhập bình luận của bạn..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="ml-auto w-[70px]"
            isLoading={isPending}
            type="submit"
            variant={'primary'}
          >
            {isReply ? 'Phản hồi' : 'Đăng'}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CommentForm;
