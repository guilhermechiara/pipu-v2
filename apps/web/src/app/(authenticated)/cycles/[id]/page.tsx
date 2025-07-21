import React, { Suspense } from "react";
import { EditCycleForm } from "../../../../features/cycles/forms/edit/EditCycleForm";

export default async function ViewAssessmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <EditCycleForm id={id} />
    </Suspense>
  );
}
