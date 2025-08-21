import { EmployeeProps } from "@app/modules/employees/entities/employee";
import { Event } from "../../../common/events/event";

export class EmployeeCreatedEvent extends Event<EmployeeProps> {
  constructor(private readonly employee: EmployeeProps) {
    super(employee);
  }
}
