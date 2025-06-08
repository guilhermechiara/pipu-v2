import { Employee } from "../../employees/types/employee";
import { Title } from "@pipu/ui/components";
import { MyCurrentAssessmentCycleCard } from "../../assessment-cycles/components/MyCurrentAssessmentCycleCard";
import { Suspense } from "react";
import { MyCurrentAssessmentCycleCardSkeleton } from "../../assessment-cycles/components/skeletons/MyCurrentAssessmentCycleCardSkeleton";
import { MyRoleDetails } from "../../roles/components/MyRoleDetails";
import { MyRoleDetailsSkeleton } from "../../roles/components/skeletons/MyRoleDetailsSkeleton";

interface ProfileNoAssessmentProps {
  employee: Employee;
}

const ProfileNoAssessment = ({ employee }: ProfileNoAssessmentProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Suspense fallback={<MyCurrentAssessmentCycleCardSkeleton />}>
        <MyCurrentAssessmentCycleCard />
      </Suspense>

      <Title as="h3">Sobre seu cargo atual</Title>
      <Suspense fallback={<MyRoleDetailsSkeleton />}>
        <MyRoleDetails />
      </Suspense>
    </div>
  );
};

export { ProfileNoAssessment };
