import React from "react";

interface FolderChildrenProps {
  isRoot: boolean;
  isRootSelected: boolean;
  isChildSelected: boolean;
  isOpen: boolean;
  children: React.ReactNode;
}

const FolderChildren = ({
  isRoot,
  isRootSelected,
  isChildSelected,
  isOpen,
  children,
}: FolderChildrenProps) => {
  const base =
    "ml-2 pl-2 relative overflow-hidden transition-all duration-300 before:absolute before:left-0 before:top-0 before:bottom-[18px] before:w-px";
  const maxHeight = isOpen ? "max-h-[1000px]" : "max-h-0";

  const lineColor = isRoot
    ? isRootSelected
      ? "before:bg-white"
      : "before:bg-neutral-700"
    : isChildSelected
      ? "before:bg-white"
      : "before:bg-neutral-700";

  const className = [base, maxHeight, lineColor].join(" ");

  return <div className={className}>{children}</div>;
};

export default FolderChildren;
