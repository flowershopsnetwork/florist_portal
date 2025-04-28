export interface PaginatedResponse<T> {
  data: T[];
  per_page: number;
  total: number;
}