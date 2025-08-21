"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@pipu/ui/components";
import { MoreVertical } from "lucide-react";
import { Employee } from "../types/Employee";
import { useState } from "react";
import { UpdateEmployeePeoplePartner } from "./UpdateEmployeePeoplePartner";
import { ActionDialog } from "../../../components/dialogs/ActionDialog";
import { UpdateEmployeeLeader } from "./UpdateEmployeeLeader";
import { UpdateEmployeeRole } from "./UpdateEmployeeRole";
import { UpdateEmployeeSalary } from "./UpdateEmployeeSalary";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div className="w-48">{row.original.name}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Papel",
    cell: ({ row }) => <div className="w-24">{row.original.role.name}</div>,
  },
  {
    accessorKey: "chapter",
    header: "Chapter",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        <Badge
          variant="default"
          className="bg-success/20 text-primary hover:bg-success/20"
        >
          {row.original.status}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Ações</div>,
    cell: ({ row }) => {
      const [peoplePartnerDialogOpen, setPeoplePartnerDialogOpen] =
        useState(false);
      const [leaderDialogOpen, setLeaderDialogOpen] = useState(false);
      const [salaryDialogOpen, setSalaryDialogOpen] = useState(false);
      const [roleDialogOpen, setRoleDialogOpen] = useState(false);

      const payment = row.original;

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={() => setPeoplePartnerDialogOpen(true)}
              >
                Editar BP de RH
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setLeaderDialogOpen(true)}>
                Editar liderança
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSalaryDialogOpen(true)}>
                Editar salário
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setRoleDialogOpen(true)}>
                Editar cargo
              </DropdownMenuItem>
              <DropdownMenuItem>Desligar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ActionDialog
            title="Editar BP de RH"
            open={peoplePartnerDialogOpen}
            onOpenChange={setPeoplePartnerDialogOpen}
          >
            <UpdateEmployeePeoplePartner
              employeeId={row.original.id}
              onSuccess={() => setPeoplePartnerDialogOpen(false)}
            />
          </ActionDialog>

          <ActionDialog
            title="Editar liderança"
            open={leaderDialogOpen}
            onOpenChange={setLeaderDialogOpen}
          >
            <UpdateEmployeeLeader
              employeeId={row.original.id}
              onSuccess={() => setLeaderDialogOpen(false)}
            />
          </ActionDialog>

          <ActionDialog
            title="Editar posição"
            open={roleDialogOpen}
            onOpenChange={setRoleDialogOpen}
          >
            <UpdateEmployeeRole
              employeeId={row.original.id}
              onSuccess={() => setRoleDialogOpen(false)}
            />
          </ActionDialog>

          <ActionDialog
            title="Editar salário"
            open={salaryDialogOpen}
            onOpenChange={setSalaryDialogOpen}
          >
            <UpdateEmployeeSalary
              employeeId={row.original.id}
              onSuccess={() => setSalaryDialogOpen(false)}
            />
          </ActionDialog>
        </div>
      );
    },
  },
];
