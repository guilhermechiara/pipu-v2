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
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Editar BP de RH
              </DropdownMenuItem>
              <DropdownMenuItem>Editar liderança</DropdownMenuItem>
              <DropdownMenuItem>Editar salário</DropdownMenuItem>
              <DropdownMenuItem>Editar cargo</DropdownMenuItem>
              <DropdownMenuItem>Desligar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
