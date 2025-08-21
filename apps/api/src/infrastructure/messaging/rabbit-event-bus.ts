import { Inject, Logger } from "@nestjs/common";
import * as amqp from "amqplib";
import { messagingConfig } from "../../config";
import { ConfigType } from "@nestjs/config";

export class RabbitEventBus {
  private readonly _logger = new Logger(RabbitEventBus.name);
  private _connection: amqp.ChannelModel;
  private _channel: amqp.Channel;
  private _isConnected: boolean = false;

  constructor(
    @Inject(messagingConfig.KEY)
    private readonly _mqConfig: ConfigType<typeof messagingConfig>,
  ) {}

  async connect(): Promise<void> {
    try {
      this._connection = await amqp.connect(this._mqConfig.url);
      this._channel = await this._connection.createChannel();

      await this._channel.assertExchange(this._mqConfig.exchange, "topic", {
        durable: true,
      });

      await this._channel.assertQueue(this._mqConfig.exchange, {
        durable: true,
      });

      await this._channel.assertQueue(this._mqConfig.queue, {
        durable: true,
        arguments: {
          "x-dead-letter-exchange": this._mqConfig.exchange,
          "x-dead-letter-routing-key": "dead-letter",
        },
      });

      this._connection.on("close", () => {
        this._isConnected = false;
        this._logger.error("RabbitMQ connection closed");
      });

      this._connection.on("error", (err) => {
        this._isConnected = false;
        this._logger.error("RabbitMQ connection error:", err);
      });

      this._isConnected = true;
      this._logger.log("RabbitEventBus connected to RabbitMQ");
    } catch (error) {
      this._logger.error("Failed to connect to RabbitMQ:", error);
    }
  }

  async publish(): Promise<void> {
    if (!this._isConnected) {
      this._logger.error("RabbitEventBus is not connected");
      return;
    }
  }

  async subscribe(): Promise<void> {
    if (!this._isConnected) {
      this._logger.error("RabbitEventBus is not connected");
    }
  }
}
