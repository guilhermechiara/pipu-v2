import { Employee } from "../../employees/types/Employee";
import { Title } from "@pipu/ui/components";
import { MyCurrentCycleCard } from "../../cycles/components/MyCurrentCycleCard";
import { Suspense } from "react";
import { MyCurrentCycleCardSkeleton } from "../../cycles/components/skeletons/MyCurrentCycleCardSkeleton";
import { MyRoleDetails } from "../../roles/components/MyRoleDetails";
import { MyRoleDetailsSkeleton } from "../../roles/components/skeletons/MyRoleDetailsSkeleton";

interface ProfileNoAssessmentProps {
  employee: Employee;
}

const ProfileNoAssessment = ({ employee }: ProfileNoAssessmentProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Suspense fallback={<MyCurrentCycleCardSkeleton />}>
        <MyCurrentCycleCard />
      </Suspense>

      <Title as="h3">Sobre seu cargo atual</Title>
      <Suspense fallback={<MyRoleDetailsSkeleton />}>
        <MyRoleDetails />
      </Suspense>
    </div>
  );
};

export { ProfileNoAssessment };
