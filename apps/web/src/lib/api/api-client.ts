import { ApiClient } from "./api";

export function getApiClient() {
  return new ApiClient({
    baseUrl: "/api",
    defaults: {
      credentials: "include",
    },
  });
}
