import { ILecture } from '@/database/lecture.model';

import { ILessonItemData } from './lesson.type';

export interface ILectureItemData extends Omit<ILecture, 'lessons'> {
  lessons: ILessonItemData[];
}

// Lecture
export interface ICreateLectureParams {
  course: string;
  title?: string;
  order?: number;
  path?: string;
}

export interface IUpdateLectureParams {
  lectureId: string;
  updateData: {
    title?: string;
    order?: number;
    _destroy?: boolean;
    path?: string;
  };
}
