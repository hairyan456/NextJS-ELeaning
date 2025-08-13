import { model, models, Schema } from 'mongoose';

import { ELessonType } from '../types/enums';
import { ILesson } from '../types/models/lesson.model';

const lessonSchema = new Schema<ILesson>({
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

export const LessonModel =
  models?.Lesson || model<ILesson>('Lesson', lessonSchema);
