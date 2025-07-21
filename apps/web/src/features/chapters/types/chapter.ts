import { PaginatedResponse } from "../../../types/pagination";

export type Chapter = {
  id: string;
  name: string;
};

export type PaginatedChaptersResponse = PaginatedResponse<Chapter>;
