import { Module } from "@nestjs/common";
import { EmployeesModule } from "@app/modules/employees/employees.module";
import { GetCurrentProfileQuery } from "@app/modules/profile/queries/get-current-profile.query";
import { ProfileController } from "@app/modules/profile/controllers/profile.controller";

@Module({
  imports: [EmployeesModule],
  controllers: [ProfileController],
  providers: [GetCurrentProfileQuery],
  exports: [GetCurrentProfileQuery],
})
export class ProfileModule {}
