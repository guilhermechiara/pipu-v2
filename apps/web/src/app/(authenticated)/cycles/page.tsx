import { CycleList } from "../../../features/cycles/components/CycleList";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderTitle,
} from "../../../components/layout/PageHeader";
import { PageContainer } from "../../../components/layout/PageContainer";
import { Button } from "@pipu/ui/components";
import Link from "next/link";

export default async function ListAssessmentCyclesPage() {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderTitle>Ciclos de avaliação</PageHeaderTitle>
        <PageHeaderDescription>
          Inicie o agendamento do seu ciclo definindo um nome, a periodicidade e
          selecionando as datas para avaliação.
        </PageHeaderDescription>
        <PageHeaderActions>
          <Button asChild>
            <Link href="/cycles/new">Criar novo ciclo</Link>
          </Button>
        </PageHeaderActions>
      </PageHeader>
      <CycleList />
    </PageContainer>
  );
}
