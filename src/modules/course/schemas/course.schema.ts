import z from 'zod';

export const CourseCommentFormSchema = z.object({
  content: z
    .string({ message: 'Vui lòng nhập bình luận' })
    .min(10, { message: 'Comment must be at least 10 characters long.' }),
});
