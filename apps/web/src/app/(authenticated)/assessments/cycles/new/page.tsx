import { NewAssessmentCycleForm } from "../../../../../features/assessment-cycles/components/forms/NewAssessmentCycleForm";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from "../../../../../components/layout/PageHeader";
import { PageContainer } from "../../../../../components/layout/PageContainer";
import { PageContent } from "../../../../../components/layout/PageContent";

export default function NewAssessmentCyclePage() {
  return (
    <>
      <PageContainer>
        <PageHeader>
          <PageHeaderTitle>Cadastro de novo ciclo de avaliação</PageHeaderTitle>
          <PageHeaderDescription>
            Avaliação de desempenho oficial realizada em toda a empresa. Pode
            ocorrer quantas vezes a empresa determinar ao longo do ano, de
            acordo com as determinações do RH.
          </PageHeaderDescription>
        </PageHeader>
        <PageContent>
          <NewAssessmentCycleForm />
        </PageContent>
      </PageContainer>
    </>
  );
}
