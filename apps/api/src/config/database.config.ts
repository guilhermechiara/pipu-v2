import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  url: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production",
  maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS),
  connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT),
  logQueries: process.env.DB_LOG_QUERIES === "true",
}));
