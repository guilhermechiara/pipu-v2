"use client";

import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { SearchableSelect } from "@pipu/ui/components";
import { Role } from "../types/role";
import { useRolesSelectQuery } from "../hooks/useRolesSelectQuery";

interface EmployeesSelectProps {
  field: ControllerRenderProps<any, any>;
}

export function RolesSelect({ field }: EmployeesSelectProps) {
  const [query, setQuery] = useState<string>();
  const { data, isLoading } = useRolesSelectQuery({ search: query });

  return (
    <SearchableSelect
      field={field}
      items={data?.data.map((role: Role) => ({
        label: role.name,
        value: role.id,
      }))}
      isSearching={isLoading}
      onSearch={(value: string) => setQuery(value)}
      placeholder="Selecione uma liderança"
    />
  );
}
