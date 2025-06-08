import { Skeleton } from "@pipu/ui/components";

const MyRoleDetailsSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="flex-grow h-32" />
      <Skeleton className="flex-grow h-72" />
    </div>
  );
};

export { MyRoleDetailsSkeleton };
