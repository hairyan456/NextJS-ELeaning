import { ICourse, IRating } from '@/shared/types';
import { ILectureItemData } from '@/shared/types/lecture.type';

import { CourseCommentFormSchema } from '../schemas';

export interface ICourseItemData extends Omit<ICourse, 'lectures' | 'rating'> {
  lectures: ILectureItemData[];
  rating: IRating[];
}

export interface ILastLessonData {
  course: string;
  lesson: string;
}

export type TCourseCommentFormValue = z.infer<typeof CourseCommentFormSchema>;
