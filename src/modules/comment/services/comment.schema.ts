import { Document, model, models, Schema } from 'mongoose';

import { ECommentStatus } from '@/shared/types/enum';

export interface IComment extends Document {
  _id: string;
  content: string;
  status: ECommentStatus;
  lesson: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  level: number;
  parentId?: Schema.Types.ObjectId;
  created_at: Date;
}

const commentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: true,
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    default: ECommentStatus.PENDING,
    enum: Object.values(ECommentStatus),
  },
  level: {
    type: Number,
    default: 0,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const CommentSchema =
  models?.Comment || model<IComment>('Comment', commentSchema);

export default CommentSchema;
