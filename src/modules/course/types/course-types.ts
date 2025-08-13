import { ICourse, IRating } from '@/shared/types';
import { ILectureItemData } from '@/shared/types/lecture.type';

export interface ICourseItemData extends Omit<ICourse, 'lectures' | 'rating'> {
  lectures: ILectureItemData[];
  rating: IRating[];
}

export interface ILastLessonData {
  course: string;
  lesson: string;
}
