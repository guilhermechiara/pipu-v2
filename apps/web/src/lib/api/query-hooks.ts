import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { ApiError } from "../apiError";
import { ApiClient } from "./api";

export function useApiQueryOptions<TData, ApiError, TSelectedData>(
  client: ApiClient,
  queryKey: QueryKey,
  endpoint: string,
): Pick<
  UseQueryOptions<TData, ApiError, TSelectedData>,
  "queryFn" | "queryKey"
> {
  return {
    queryKey,
    queryFn: async () => {
      const response = await client.get<TData>(endpoint);
      if (!response.ok) {
        throw new ApiError(response.error);
      }

      return response.data;
    },
  };
}
