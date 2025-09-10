"use server";

import { makeServerAction } from "../../../lib/serverAction";
import { VerifyCodeRequest, VerifyCodeResponse } from "@pipu/api";
import { getApiServer } from "../../../lib/api/api-server";
import { cookies } from "next/headers";

export const verifyCode = makeServerAction<
  VerifyCodeRequest,
  VerifyCodeResponse
>(async (input) => {
  const client = await getApiServer();
  const response = await client.post<VerifyCodeResponse>("/auth/verify-code", {
    code: input.code,
    email: input.email,
  });

  if (response.ok) {
    (await cookies()).set("auth", response.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 5,
    });
  }

  return response;
});
