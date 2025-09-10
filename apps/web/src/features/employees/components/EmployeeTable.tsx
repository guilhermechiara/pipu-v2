"use client";

import { Button, DataTable } from "@pipu/ui/components";
import { useEmployeesQueryOptions } from "../hooks/useEmployeesQuery";
import { useState, useTransition } from "react";
import { columns } from "./EmployeeTableColumns";
import { getApiClient } from "../../../lib/api/api-client";
import { useQuery } from "@tanstack/react-query";

export interface EmployeeTableProps {
  initialSearch: string;
}

export function EmployeeTable({ initialSearch }: EmployeeTableProps) {
  const client = getApiClient();
  const [search, setSearch] = useState<string>(initialSearch);
  const [isPending, startTransition] = useTransition();

  const { isLoading, isFetching, data, refetch } = useQuery({
    ...useEmployeesQueryOptions(client, { search }),
    placeholderData: (prev) => prev,
  });

  const handleSearch = () => {
    startTransition(() => {
      setSearch("123444");
    });
  };

  if (isLoading || !data) {
    return <p>Loading 222...</p>;
  }

  return (
    <>
      <div className="container mx-auto py-10">
        <div className={isFetching ? "opacity-50" : ""}>
          <DataTable columns={columns} data={data} />

          <Button onClick={handleSearch}>Revalidate</Button>

          {search}
        </div>
      </div>
    </>
  );
}
