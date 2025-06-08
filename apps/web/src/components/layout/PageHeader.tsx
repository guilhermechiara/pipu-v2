import { Title } from "@pipu/ui/components";
import { Children, PropsWithChildren, ReactElement } from "react";

const PageHeader = ({ children }: PropsWithChildren) => {
  const childrenArray = Children.toArray(children);

  const hasActions = childrenArray.some(
    (child) =>
      typeof child === "object" &&
      "type" in child &&
      (child as ReactElement).type === PageHeaderActions,
  );

  if (hasActions) {
    const actions = childrenArray.find(
      (child) =>
        typeof child === "object" &&
        "type" in child &&
        (child as ReactElement).type === PageHeaderActions,
    );

    const otherChildren = childrenArray.filter(
      (child) =>
        !(
          typeof child === "object" &&
          "type" in child &&
          (child as ReactElement).type === PageHeaderActions
        ),
    );

    return (
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-4">{otherChildren}</div>
        {actions}
      </div>
    );
  }

  return <div className="flex flex-col gap-4">{children}</div>;
};

PageHeader.displayName = "PageHeader";

const PageHeaderTitle = ({ children }: PropsWithChildren) => {
  return (
    <Title type="primary" as="h3">
      {children}
    </Title>
  );
};

PageHeaderTitle.displayName = "PageHeaderTitle";

const PageHeaderDescription = ({ children }: PropsWithChildren) => {
  return <p className="text-sm">{children}</p>;
};

PageHeaderDescription.displayName = "PageHeaderDescription";

const PageHeaderActions = ({ children }: PropsWithChildren) => {
  return <div className="flex gap-4">{children}</div>;
};

export {
  PageHeader,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
};
