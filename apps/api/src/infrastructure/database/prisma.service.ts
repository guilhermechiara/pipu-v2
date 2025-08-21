import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { databaseConfig } from "../../config";
import * as config from "@nestjs/config";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(
    @Inject(databaseConfig.KEY)
    private dbConfig: config.ConfigType<typeof databaseConfig>,
  ) {
    const databaseUrl = dbConfig.url;
    const logQueries = dbConfig.logQueries;

    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
      log: [
        {
          emit: "stdout",
          level: "query",
        },
      ],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log("Successfully connected to database");
    } catch (error) {
      this.logger.error("Failed to connect to database", error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log("Disconnected from database");
  }
}
