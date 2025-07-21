import { OutlineCard, OutlineCardContent, Skeleton } from "@pipu/ui/components";
import * as React from "react";

const MyCurrentCycleCardSkeleton = () => {
  return (
    <OutlineCard type="primary">
      <OutlineCardContent className="flex flex-col gap-8">
        <div className="flex flex-row gap-4">
          <Skeleton className="w-[35%] h-8" />
        </div>

        <div className="flex flex-row gap-4">
          <Skeleton className="w-[20%] h-24" />
          <Skeleton className="w-[20%] h-24" />
        </div>
      </OutlineCardContent>
    </OutlineCard>
  );
};

export { MyCurrentCycleCardSkeleton };
