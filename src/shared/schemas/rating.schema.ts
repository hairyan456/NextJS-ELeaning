import { model, models, Schema } from 'mongoose';

import { ERatingStatus } from '../types/enums';
import { IRating } from '../types/models/rating.model';

const ratingSchema = new Schema<IRating>({
  rate: {
    type: Number,
    require: true,
    default: 5,
  },
  content: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: Object.values(ERatingStatus),
    default: ERatingStatus.UNACTIVE,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const RatingModel =
  models?.Rating || model<IRating>('Rating', ratingSchema);
