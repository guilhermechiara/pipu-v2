import {
  MutationKey,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { ApiError } from "../apiError";
import { ServerActionResult } from "../serverAction";

export function useApiMutation<
  TData,
  TVariables = void,
  TError = ApiError,
  TContext = unknown,
>(
  mutationKey: MutationKey,
  mutationFn: (variables: TVariables) => Promise<ServerActionResult<TData>>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationKey" | "mutationFn"
  >,
) {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationKey,
    mutationFn: async (variables: TVariables) => {
      const response = await mutationFn(variables);
      if (!response.ok) throw new ApiError(response.error);
      return response.data;
    },
    ...options,
  });
}
