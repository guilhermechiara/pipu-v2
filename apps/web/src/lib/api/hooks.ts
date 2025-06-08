import {
  QueryClient,
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { apiClient, ApiError, ApiResponse } from "./client";

const DEFAULT_RETRY_COUNT = 1;
const DEFAULT_STALE_TIME = 5 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: DEFAULT_RETRY_COUNT,
      staleTime: DEFAULT_STALE_TIME,
      refetchOnWindowFocus: false,
    },
  },
});

export const invalidateQueries = (queryKey: QueryKey) => {
  return queryClient.invalidateQueries({ queryKey });
};

export const prefetchQuery = async <T>(
  queryKey: QueryKey,
  fetcher: () => Promise<T>,
  options?: UseQueryOptions<T, ApiError>,
) => {
  return queryClient.prefetchQuery({
    queryKey,
    queryFn: fetcher,
    ...options,
  });
};

export function useApiQuery<TData>(
  queryKey: QueryKey,
  endpoint: string,
  options?: UseQueryOptions<ApiResponse<TData>, ApiError, TData>,
) {
  return useQuery<ApiResponse<TData>, ApiError, TData>({
    queryKey,
    queryFn: () => apiClient.get<TData>(endpoint),
    select: (response) => response.data,
    ...options,
  });
}

export function useApiSuspenseQuery<TData>(
  queryKey: QueryKey,
  endpoint: string,
  options?: UseSuspenseQueryOptions<ApiResponse<TData>, ApiError, TData>,
) {
  return useSuspenseQuery<ApiResponse<TData>, ApiError, TData>({
    queryKey,
    queryFn: () => apiClient.get<TData>(endpoint),
    select: (response) => response.data,
    ...options,
  });
}

export function useApiMutation<TData, TVariables>(
  endpoint: string,
  options?: UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>,
) {
  return useMutation<ApiResponse<TData>, ApiError, TVariables>({
    mutationFn: (variables) => apiClient.post<TData>(endpoint, variables),
    ...options,
  });
}

export function useApiPutMutation<TData, TVariables>(
  endpoint: string,
  options?: UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>,
) {
  return useMutation<ApiResponse<TData>, ApiError, TVariables>({
    mutationFn: (variables) => apiClient.put<TData>(endpoint, variables),
    ...options,
  });
}

export function useApiPatchMutation<TData, TVariables>(
  endpoint: string,
  options?: UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>,
) {
  return useMutation<ApiResponse<TData>, ApiError, TVariables>({
    mutationFn: (variables) => apiClient.patch<TData>(endpoint, variables),
    ...options,
  });
}

export function useApiDeleteMutation<TData, TVariables = string>(
  endpoint: string,
  options?: UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>,
) {
  return useMutation<ApiResponse<TData>, ApiError, TVariables>({
    mutationFn: (variables) => {
      const url =
        typeof variables === "string" ? `${endpoint}/${variables}` : endpoint;
      return apiClient.delete<TData>(url);
    },
    ...options,
  });
}
