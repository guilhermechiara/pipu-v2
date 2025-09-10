import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderTitle,
} from "../../../components/layout/PageHeader";
import { PageContainer } from "../../../components/layout/PageContainer";
import { Button } from "@pipu/ui/components";
import Link from "next/link";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { EmployeeTable } from "../../../features/employees/components/EmployeeTable";
import { getQueryClient } from "../../../lib/getQueryClient";
import { useEmployeesQueryOptions } from "../../../features/employees/hooks/useEmployeesQuery";
import { getApiServer } from "../../../lib/api/api-server";

export default async function EmployeesListPage() {
  const queryClient = getQueryClient();
  const client = await getApiServer();

  const search = "testing";

  void queryClient.prefetchQuery(useEmployeesQueryOptions(client, { search }));

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderTitle>Gestão de pessoas</PageHeaderTitle>
        <PageHeaderDescription>
          Faça a gestão das pessoas da sua empresa por aqui
        </PageHeaderDescription>
        <PageHeaderActions>
          <Button asChild>
            <Link href="/employees/new">Adicionar pessoas</Link>
          </Button>
        </PageHeaderActions>
      </PageHeader>
      <Suspense fallback={<p>Loading...</p>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <EmployeeTable initialSearch={search} />
        </HydrationBoundary>
      </Suspense>
    </PageContainer>
  );
}
