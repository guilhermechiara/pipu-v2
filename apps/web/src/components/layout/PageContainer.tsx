import { PropsWithChildren } from "react";

const PageContainer = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-14">{children}</div>;
};

export { PageContainer };
