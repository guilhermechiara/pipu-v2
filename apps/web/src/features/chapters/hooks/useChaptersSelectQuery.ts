import { useApiQuery } from "../../../lib/api/query-hooks";
import { PaginatedChaptersResponse } from "../types/chapter";

export function useChaptersSelectQuery({ search }: { search?: string }) {
  return useApiQuery<PaginatedChaptersResponse>(
    ["chapters", search],
    search ? `/chapters?search=${search}` : "/chapters",
  );
}
