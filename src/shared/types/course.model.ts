import { Document, Schema } from 'mongoose';

import { ECourseLevel, ECourseStatus } from '@/shared/types/enums';

export interface ICourse extends Document {
  _id: string;
  title: string;
  image: string;
  intro_url: string;
  description: string;
  price: number;
  sale_price: number;
  slug: string;
  status: ECourseStatus;
  created_at: Date;
  author: Schema.Types.ObjectId;
  level: ECourseLevel;
  views: number;
  rating: Schema.Types.ObjectId[];
  info: {
    requirements: string[];
    benefits: string[];
    qa: {
      question: string;
      answer: string;
    }[];
  };
  lectures: Schema.Types.ObjectId[];
  _destroy: boolean;
}
