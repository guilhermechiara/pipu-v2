import { Skeleton } from "@pipu/ui/components";

const ProfileAssessmentSkeleton = () => {
  return (
    <div className="flex w-full min-h-full">
      <div className="flex-grow pr-12">
        <div className="flex flex-col gap-8">
          <Skeleton className="flex-grow h-56" />
          <Skeleton className="flex-grow h-8" />
          <Skeleton className="flex-grow h-32" />
          <Skeleton className="flex-grow h-72" />
        </div>
      </div>
    </div>
  );
};

export { ProfileAssessmentSkeleton };
