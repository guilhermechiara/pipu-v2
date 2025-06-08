import { Suspense } from "react";
import { MyProfile } from "../../../features/profile/components/MyProfile";
import { ProfileAssessmentSkeleton } from "../../../features/profile/components/skeletons/ProfileAssessmentSkeleton";

export default function HomePage() {
  return (
    <Suspense fallback={<ProfileAssessmentSkeleton />}>
      <MyProfile />
    </Suspense>
  );
}
