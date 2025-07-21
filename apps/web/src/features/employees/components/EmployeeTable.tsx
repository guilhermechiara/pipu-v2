import { DataTable } from "@pipu/ui/components";
import { columns } from "./EmployeeTableColumns";
import { Employee } from "../types/Employee";

async function getData(): Promise<Employee[]> {
  return Array.from({ length: 15 }).map((_, index) => ({
    id: (index + 1).toString(),
    name: "Ross Geller",
    role: {
      id: "asduhu",
      name: "CEO",
    },
    leadership: {
      id: "123123",
      name: "Someone very smart",
    },
    chapter: "Tecnologia",
    email: "ross.geller@pipu.com",
    peoplePartner: {
      id: "123123",
      name: "Someone very smart",
    },
    status: "active",
  }));
}

export async function EmployeeTable() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
