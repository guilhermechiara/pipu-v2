import { Module } from "@nestjs/common";
import { EmployeesController } from "./controllers/employees.controller";
import { EmployeeRepository } from "./repositories/employee.repository";
import { DatabaseModule } from "@app/infrastructure/database/database.module";
import { EmployeeMapper } from "./mappers/employee.mapper";
import { EmployeeCreatedHandler } from "./events/handlers/employee-created.handler";
import { CreateEmployeeCommand } from "./commands/create-employee.command";
import { EmployeeHierarchyNodeRepository } from "@app/modules/employees/repositories/employee-hierarchy-node.repository";
import { EmployeeHierarchyNodeMapper } from "@app/modules/employees/mappers/employee-hierarchy-node.mapper";
import { EmployeesService } from "@app/modules/employees/services/employees.service";
import { EmployeeHierarchyNodesService } from "@app/modules/employees/services/employee-hierarchy-nodes.service";
import { ChangeLeaderCommand } from "@app/modules/employees/commands/change-leader.command";
import { ChangePeoplePartnerCommand } from "@app/modules/employees/commands/change-people-partner.command";
import { ListEmployeesQuery } from "@app/modules/employees/queries/list-employees.query";

@Module({
  imports: [DatabaseModule],
  providers: [
    EmployeeCreatedHandler,
    EmployeeRepository,
    EmployeeMapper,
    EmployeeHierarchyNodeRepository,
    EmployeeHierarchyNodeMapper,
    EmployeesService,
    EmployeeHierarchyNodesService,
    CreateEmployeeCommand,
    ChangeLeaderCommand,
    ChangePeoplePartnerCommand,
    ListEmployeesQuery,
  ],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
