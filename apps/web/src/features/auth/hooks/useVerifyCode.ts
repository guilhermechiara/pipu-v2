import { VerifyCodeRequest, VerifyCodeResponse } from "@pipu/api";
import { verifyCode } from "../actions/verifyCode";
import { useApiMutation } from "../../../lib/api/mutation-hooks";

export function useVerifyCode() {
  return useApiMutation<VerifyCodeResponse, VerifyCodeRequest>(
    ["auth", "verify-code"],
    verifyCode,
  );
}
