import { Document, model, models, Schema } from 'mongoose';

import { EUserRole, EUserStatus } from '@/shared/types/enums';

export interface IUser extends Document {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  courses: Schema.Types.ObjectId[];
  status: EUserStatus;
  role: EUserRole;
  created_at: Date;
}

const userSchema = new Schema<IUser>({
  clerkId: {
    type: String,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  avatar: {
    type: String,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
  status: {
    type: String,
    enum: Object.values(EUserStatus),
    default: EUserStatus.ACTIVE,
  },
  role: {
    type: String,
    enum: Object.values(EUserRole),
    default: EUserRole.USER,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = models?.User || model<IUser>('User', userSchema);

export default User;
