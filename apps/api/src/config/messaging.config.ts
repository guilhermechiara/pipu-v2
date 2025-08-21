import { registerAs } from "@nestjs/config";

export default registerAs("messaging", () => ({
  url: process.env.RABBIT_URL || "amqp://root:123456@localhost:5672",
  exchange: process.env.RABBIT_EXCHANGE || "entities.events",
  queue: process.env.RABBIT_QUEUE || "entities.events.queue",
  dlq: process.env.RABBIT_DLQ || "entities.events.dlq",
}));
