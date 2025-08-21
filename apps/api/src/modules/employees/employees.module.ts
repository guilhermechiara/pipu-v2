import { Module } from "@nestjs/common";
import { EmployeesController } from "./controllers/employees.controller";
import { EmployeeRepository } from "./repositories/employee.repository";
import { DatabaseModule } from "@app/infrastructure/database/database.module";
import { EmployeeMapper } from "./mappers/employee.mapper";
import { EmployeeCreatedHandler } from "./events/handlers/employee-created.handler";
import { CreateEmployeeCommand } from "./commands/create-employee.command";

@Module({
  imports: [DatabaseModule],
  providers: [
    EmployeeCreatedHandler,
    EmployeeRepository,
    EmployeeMapper,
    CreateEmployeeCommand,
  ],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
