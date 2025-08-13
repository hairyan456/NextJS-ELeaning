import { ILesson } from './models';

export interface ILessonItemData extends Omit<ILesson, 'course' | 'lecture'> {
  course: string;
}

export interface ICreateLessonParams {
  lecture: string;
  course: string;
  title?: string;
  order?: number;
  path?: string;
  slug?: string;
}

export interface IUpdateLessonParams {
  lessonId: string;
  updateData: {
    title?: string;
    slug?: string;
    duration?: number;
    video_url?: string;
    content?: string;
  };
  path?: string;
}
