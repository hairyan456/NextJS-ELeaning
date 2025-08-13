import { IHistory } from '@/database/history.model';

// History
export interface ICreateHistoryParams {
  course: string;
  lesson: string;
  checked: boolean | string;
  path?: string;
}

export interface IHistoryItemData extends Omit<IHistory, ''> {}
