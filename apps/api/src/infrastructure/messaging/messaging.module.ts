import { DynamicModule, Logger, Module, OnModuleInit } from "@nestjs/common";
import { RabbitEventBus } from "./rabbit-event-bus";
import { ConfigModule } from "@nestjs/config";
import { messagingConfig } from "../../config";

@Module({})
export class MessagingModule implements OnModuleInit {
  private readonly logger = new Logger(MessagingModule.name);

  static forRoot(): DynamicModule {
    return {
      module: MessagingModule,
      imports: [ConfigModule.forRoot({ load: [messagingConfig] })],
      providers: [RabbitEventBus],
      exports: [RabbitEventBus, ConfigModule],
      global: true,
    };
  }

  async onModuleInit() {}
}
