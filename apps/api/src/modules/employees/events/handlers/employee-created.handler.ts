import { EmployeeCreatedEvent } from "../employee-created.event";
import { Logger } from "@nestjs/common";

export class EmployeeCreatedHandler {
  private readonly logger = new Logger(EmployeeCreatedHandler.name);

  handle(event: EmployeeCreatedEvent): void {
    throw new Error("Method not implemented.");
  }
}
