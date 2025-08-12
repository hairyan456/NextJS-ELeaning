import { ICourse } from '@/shared/types';

export interface ICourseItemData extends Omit<ICourse, 'lectures'> {
  lectures: {
    lessons: {
      slug: string;
    }[];
  }[];
}

export interface ILastLessonData {
  course: string;
  lesson: string;
}
