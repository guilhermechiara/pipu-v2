import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ConfigModule } from "@nestjs/config";
import { databaseConfig } from "../../config";

@Global()
@Module({
  imports: [ConfigModule.forRoot({ load: [databaseConfig] })],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
