import { ICourse } from './models';
import { ILesson } from './models/lesson.model';

export interface ICourseLessonData {
  duration: number;
  lessons: number;
}

export interface IUpdateCourseLecture {
  _id: string;
  title: string;
  lessons: ILesson[];
}

// Course
export interface IGetAllCourseParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface ICreateCourseParams {
  title: string;
  slug: string;
  author: string;
}

export interface IUpdateCourseParams {
  slug: string;
  updateData: Partial<ICourse>;
  path?: string;
}

export interface ICourseUpdateParams extends Omit<ICourse, 'lectures'> {
  lectures: IUpdateCourseLecture[];
}

export interface IStudyCoursesProps extends Omit<ICourse, 'lectures'> {
  lectures: {
    lessons: {
      slug: string;
    }[];
  }[];
}
