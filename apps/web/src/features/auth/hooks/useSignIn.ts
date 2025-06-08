import { useApiMutation } from "../../../lib/api/hooks";
import { SignInRequest, SignInResponse } from "../types/signIn";

export function useSignIn() {
  return useApiMutation<SignInResponse, SignInRequest>("/auth/sign-in");
}
