import { Document, Schema } from 'mongoose';

import { ERatingStatus } from '../enums';

export interface IRating extends Document {
  _id: string;
  rate: number;
  content: string;
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  status: ERatingStatus;
  created_at: Date;
}
