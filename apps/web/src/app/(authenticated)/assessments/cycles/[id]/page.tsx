import React, { Suspense } from "react";
import { EditAssessmentCycleForm } from "../../../../../features/assessment-cycles/components/forms/EditAssessmentCycleForm";

export default async function ViewAssessmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <EditAssessmentCycleForm id={id} />
    </Suspense>
  );
}
