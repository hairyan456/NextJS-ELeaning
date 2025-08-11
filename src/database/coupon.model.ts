import { Document, model, models, Schema } from 'mongoose';

import { ECouponType } from '@/shared/types/enums';

export interface ICoupon extends Document {
  _id: string;
  title: string;
  code: string;
  active: boolean;
  start_date: Date;
  end_date: Date;
  used: number;
  limit: number;
  course: Schema.Types.ObjectId[];
  type: ECouponType; // Type of coupon (e.g., percentage, fixed amount)
  value: number;
  created_at: Date;
}

const couponSchema = new Schema<ICoupon>({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
  limit: {
    type: Number,
  },
  used: {
    type: Number,
    default: 0, // Default to 0 if not specified
  },
  course: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
  type: {
    type: String,
    enum: Object.values(ECouponType),
    default: ECouponType.PERCENT, // Default type can be set to Percentage
  },
  value: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Coupon = models?.Coupon || model<ICoupon>('Coupon', couponSchema);

export default Coupon;
