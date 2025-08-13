import { ICoupon } from '@/database/coupon.model';

// Coupon
export type TCreateCouponParams = {
  title: string;
  code: string;
  type: ECouponType;
  value?: number;
  start_date?: Date;
  end_date?: Date;
  active?: boolean;
  limit?: number;
  course?: string[];
};

export type TUpdateCouponParams = {
  _id: string;
  updateData: Partial<TCreateCouponParams>;
};

export type TCouponParams = Omit<ICoupon, 'course'> & {
  course: {
    _id: string;
    title: string;
  }[];
};

export type TCouponItem = Omit<ICoupon, '_id' | 'course'>;
