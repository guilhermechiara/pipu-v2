import { EmployeeResponse } from "@pipu/api";
import { routeHandlerWrapper } from "../../../lib/routeHandler";

export async function GET() {
  return routeHandlerWrapper<EmployeeResponse[]>(`/employees?q=1234`);
}
