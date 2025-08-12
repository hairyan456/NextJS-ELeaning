import { model, models, Schema } from 'mongoose';

import { ICourse } from '../types';
import { ECourseLevel, ECourseStatus } from '../types/enums';

const courseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: '',
  },
  intro_url: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: 0,
  },
  sale_price: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: Object.values(ECourseStatus),
    default: ECourseStatus.PENDING,
  },
  level: {
    type: String,
    enum: Object.values(ECourseLevel),
    default: ECourseLevel.BEGINNER,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  lectures: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lecture',
    },
  ],
  rating: {
    type: [Schema.Types.ObjectId],
    ref: 'Rating',
  },
  views: {
    type: Number,
    default: 0,
  },
  info: {
    requirements: {
      type: [String],
    },
    benefits: {
      type: [String],
    },
    qa: [
      {
        question: {
          type: String,
        },
        answer: {
          type: String,
        },
      },
    ],
  },
  _destroy: {
    type: Boolean,
    default: false,
  },
});

export const CourseModel =
  models?.Course || model<ICourse>('Course', courseSchema);
