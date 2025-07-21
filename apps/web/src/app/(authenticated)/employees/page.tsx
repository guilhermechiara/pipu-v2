import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderTitle,
} from "../../../components/layout/PageHeader";
import { PageContainer } from "../../../components/layout/PageContainer";
import { Button } from "@pipu/ui/components";
import Link from "next/link";
import { EmployeeList } from "../../../features/employees/components/EmployeeList";

export default async function EmployeesListPage() {
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
      <EmployeeList />
    </PageContainer>
  );
}
