export interface IQueryFilter {
  limit?: number;
  page?: number;
  search?: string;
}

// filter, paginate
export interface IFilterData {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  active?: boolean;
}

export interface IMenuItems {
  url: string;
  title: string;
  icon?: React.ReactNode;
  onlyIcon?: boolean;
}
