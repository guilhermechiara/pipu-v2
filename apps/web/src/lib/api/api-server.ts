import "server-only";

import { cookies, headers } from "next/headers";
import { ApiClient } from "./api";

const BASE_URL = process.env.API_UPSTREAM_URL ?? "http://localhost:3001";

export async function getApiServer() {
  return new ApiClient({
    baseUrl: BASE_URL,
    beforeFetch: async () => {
      const hdrs: Record<string, string> = {};
      const cookie = await cookies();

      const h = await headers();
      const auth = cookie.get("auth");
      if (auth) hdrs["authorization"] = `Bearer ${auth.value}`;

      const reqId = h.get("x-request-id");
      if (reqId) hdrs["x-request-id"] = reqId;

      return { headers: hdrs };
    },
    defaults: {
      cache: "no-store",
    },
  });
}
