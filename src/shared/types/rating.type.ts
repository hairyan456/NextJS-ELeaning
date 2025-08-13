import { ERatingStatus } from './enums';

export interface ICreateRatingParams {
  rate: number;
  content: string;
  user: string;
  course: string;
}

export type TRatingItem = {
  _id: string;
  content: string;
  rate: number;
  created_at: string;
  course: {
    slug: string;
    title: string;
  };
  user: {
    name: string;
  };
  status: ERatingStatus;
};

export type TRatingIcon = 'awesome' | 'good' | 'meh' | 'bad' | 'terrible';
