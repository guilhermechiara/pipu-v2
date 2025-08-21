import { Module } from "@nestjs/common";
import { EmployeesModule } from "./modules/employees/employees.module";
import { DatabaseModule } from "./infrastructure/database/database.module";
import { ConfigModule } from "@nestjs/config";
import { databaseConfig } from "./config";
import { MessagingModule } from "./infrastructure/messaging/messaging.module";
import { OrganizationsModule } from "@app/modules/organizations/organizations.module";
import { AuthModule } from "@app/modules/auth/auth.module";

@Module({
  imports: [
    MessagingModule.forRoot(),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    AuthModule,
    DatabaseModule,
    OrganizationsModule,
    EmployeesModule,
  ],
})
export class AppModule {}
