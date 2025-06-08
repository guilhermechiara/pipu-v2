"use client";

import { ProfileAssessment } from "./ProfileAssessment";
import { SideProfile } from "./SideProfile";
import { Suspense } from "react";
import { SideProfileSkeleton } from "./skeletons/SideProfileSkeleton";
import { ProfileAssessmentSkeleton } from "./skeletons/ProfileAssessmentSkeleton";

const MyProfile = () => {
  return (
    <div className="flex w-full min-h-full">
      <Suspense fallback={<ProfileAssessmentSkeleton />}>
        <div className="flex-grow pr-12">
          <ProfileAssessment />
        </div>
      </Suspense>

      <Suspense fallback={<SideProfileSkeleton />}>
        <div className="w-80 shrink-0">
          <SideProfile />
        </div>
      </Suspense>
    </div>
  );
};

export { MyProfile };
