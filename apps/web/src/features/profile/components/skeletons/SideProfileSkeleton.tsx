import { Skeleton } from "@pipu/ui/components";

const SideProfileSkeleton = () => {
  return (
    <div className="h-[calc(100vh_-_theme(spacing.20)_-_10rem)] flex flex-col items-center border rounded-lg p-8 gap-8">
      <Skeleton className="h-[133px] w-[133px] rounded-full" />
      <Skeleton className="w-48 h-7 font-medium" />
      <div className="flex flex-col self-start gap-6 w-full">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-1">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="flex-grow h-7" />
          </div>
        ))}
      </div>
    </div>
  );
};

export { SideProfileSkeleton };
