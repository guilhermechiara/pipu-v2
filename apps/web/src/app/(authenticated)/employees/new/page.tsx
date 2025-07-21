import { PageContainer } from "../../../../components/layout/PageContainer";
import {
  PageHeader,
  PageHeaderTitle,
} from "../../../../components/layout/PageHeader";
import { NewEmployeeForm } from "../../../../features/employees/components/NewEmployeeForm";

export default async function NewEmployeePage() {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderTitle>Adicione uma pessoa</PageHeaderTitle>
      </PageHeader>
      <NewEmployeeForm />
    </PageContainer>
  );
}
