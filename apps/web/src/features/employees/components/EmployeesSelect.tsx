"use client";

import { useState } from "react";
import { Employee } from "../types/Employee";
import { ControllerRenderProps } from "react-hook-form";
import { SearchableSelect } from "@pipu/ui/components";
import { useEmployeesSelectQuery } from "../hooks/useEmployeesSelectQuery";

interface EmployeesSelectProps {
  field: ControllerRenderProps<any, any>;
}

export function EmployeesSelect({ field }: EmployeesSelectProps) {
  const [query, setQuery] = useState<string>();
  const { data, isLoading } = useEmployeesSelectQuery({ search: query });

  return (
    <SearchableSelect
      field={field}
      items={data?.data.map((employee: Employee) => ({
        label: employee.name,
        value: employee.id,
      }))}
      isSearching={isLoading}
      onSearch={(value: string) => setQuery(value)}
      placeholder="Selecione uma liderança"
    />
  );
}
