"use server";

import { RequestCodeRequest } from "@pipu/api";
import { getApiServer } from "../../../lib/api/api-server";

export async function requestCode(input: RequestCodeRequest): Promise<void> {
  const client = await getApiServer();
  await client.post("/auth/request-code", { email: input.email });
}
