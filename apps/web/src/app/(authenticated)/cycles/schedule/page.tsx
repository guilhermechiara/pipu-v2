import { ScheduleCycleForm } from "../../../../features/cycles/forms/schedule/ScheduleCycleForm";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from "../../../../components/layout/PageHeader";
import { PageContainer } from "../../../../components/layout/PageContainer";
import { PageContent } from "../../../../components/layout/PageContent";

export default function ScheduleAssessmentCyclePage() {
  return (
    <>
      <PageContainer>
        <PageHeader>
          <PageHeaderTitle>Agendar um ciclo de avaliação</PageHeaderTitle>
          <PageHeaderDescription>
            Avaliação de desempenho oficial realizada em toda a empresa. Pode
            ocorrer quantas vezes a empresa determinar ao longo do ano, de
            acordo com as determinações do RH.
          </PageHeaderDescription>
        </PageHeader>
        <PageContent>
          <ScheduleCycleForm />
        </PageContent>
      </PageContainer>
    </>
  );
}
