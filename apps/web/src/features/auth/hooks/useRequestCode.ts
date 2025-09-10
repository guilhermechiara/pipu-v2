import { getApiClient } from "../../../lib/api/api-client";
import { useMutation } from "@tanstack/react-query";
import { requestCode } from "../actions/requestCode";
import { RequestCodeRequest } from "@pipu/api";

export function useRequestCode() {
  const client = getApiClient();

  return useMutation<void, Error, RequestCodeRequest>({
    mutationKey: ["auth", "request-code"],
    mutationFn: requestCode,
  });
}
