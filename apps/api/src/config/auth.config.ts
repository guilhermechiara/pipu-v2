import { registerAs } from "@nestjs/config";

export default registerAs("auth", () => ({
  api_key: process.env.AUTH_API_KEY,
  client_id: process.env.AUTH_CLIENT_ID,
}));
