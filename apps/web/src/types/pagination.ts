export type PaginationOptions = {
  page?: number;
  pageSize?: number;
};

export type PaginatedResponse<T> = {
  total: number;
  page: number;
  pageSize: number;
  data: T[];
};
