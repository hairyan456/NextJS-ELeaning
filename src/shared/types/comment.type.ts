// COMMENT

import { IComment } from '@/modules/comment/services/comment.schema';

export interface ICreateCommentParams {
  content: string;
  lesson: string;
  user: string;
  level: number;
  parentId?: string;
  path?: string;
}

export interface ICommentItem extends Omit<IComment, 'user'> {
  user: {
    name: string;
    avatar: string;
  };
}
