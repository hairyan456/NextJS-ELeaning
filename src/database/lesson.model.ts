import { Document, model, models, Schema } from 'mongoose';

import { ELessonType } from '@/shared/types/enums';

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

const lessonSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    require: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
  },
  video_url: {
    type: String,
  },
  _destroy: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 0,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  lecture: {
    type: Schema.Types.ObjectId,
    ref: 'Lecture',
  },

  type: {
    type: String,
    enum: Object.values(ELessonType),
    default: ELessonType.VIDEO,
  },
});

const Lesson = models?.Lesson || model<ILesson>('Lesson', lessonSchema);

export default Lesson;
