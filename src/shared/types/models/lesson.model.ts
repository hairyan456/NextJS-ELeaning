import { Document, Schema } from 'mongoose';

import { ELessonType } from '../enums';

export interface ILesson extends Document {
  _id: string;
  title: string;
  slug: string;
  lecture: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  type: ELessonType;
  order: number;
  duration: number;
  video_url: string;
  content: string;
  _destroy: boolean;
  created_at: Date;
}
