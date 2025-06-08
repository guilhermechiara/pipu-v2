"use client";

import { Button, Card, CardContent } from "@pipu/ui/components";
import Image from "next/image";
import AssessmentCycleIcon from "../../../../public/images/assessment-cycle.png";
import { useAssessmentCycles } from "../hooks/useAssessmentCycles";
import { AssessmentCycle } from "../types/assessmentCycle";
import Link from "next/link";

interface AssessmentCycleInfoProps {
  label: string;
  text: string;
}

const AssessmentCycleInfo = ({ label, text }: AssessmentCycleInfoProps) => {
  return (
    <div>
      <p className="text-sm">{label}</p>
      <p className="text-sm font-bold">{text}</p>
    </div>
  );
};

interface AssessmentCycleItemProps {
  assessmentCycle: AssessmentCycle;
}

const AssessmentCycleItem = ({ assessmentCycle }: AssessmentCycleItemProps) => {
  return (
    <Card className="shadow-transparent">
      <CardContent className="flex flex-row items-center gap-8 py-6">
        <div>
          <Image
            src={AssessmentCycleIcon}
            alt="Assessment Cycle"
            height={36}
            width={36}
          />
        </div>

        <div className="flex flex-col flex-1 gap-6">
          <AssessmentCycleInfo label="Nome" text={assessmentCycle.name} />
          <AssessmentCycleInfo
            label="Chapter"
            text={assessmentCycle.chapters.map((c) => c.name).join(", ")}
          />
        </div>

        <div>
          <Button variant="outline" asChild>
            <Link href={`/assessments/cycles/${assessmentCycle.id}`}>
              Agendar
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CycleAssessmentList = () => {
  const { data: assessmentCycles } = useAssessmentCycles();

  return (
    <>
      {assessmentCycles.map((cycle) => (
        <AssessmentCycleItem key={cycle.id} assessmentCycle={cycle} />
      ))}
    </>
  );
};

export { CycleAssessmentList };
