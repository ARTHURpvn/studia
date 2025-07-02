import { FileIcon, FolderIcon, KanbanSquareIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { FolderItem } from "@/store/useFoldersStore";

interface FolderButtonProps {
  isRoot: boolean;
  isSelected: boolean;
  item: FolderItem;
  onClick: () => void;
  showChevron: React.ReactNode;
}

const FolderButton = ({
  isRoot,
  isSelected,
  item,
  onClick,
  showChevron,
}: FolderButtonProps) => {
  const Icon = {
    folder: FolderIcon,
    note: FileIcon,
    kanban: KanbanSquareIcon,
  }[item.type];

  const base = "relative gap-[6px] text-md cursor-pointer z-1";
  const padding = !isRoot ? "pl-4" : "";
  const beforeLine = !isRoot
    ? `before:absolute before:top-1/2 before:-left-4 before:w-4 before:border-t before:-z-1 ${
        isSelected ? "before:border-white" : "before:border-neutral-700"
      }`
    : "";
  const selectedStyle = isSelected ? "text-white font-semibold" : "";

  const className = [base, padding, beforeLine, selectedStyle].join(" ");

  return (
    <Button
      onClick={onClick}
      variant="folder"
      size="folder"
      className={className}
    >
      {showChevron}
      <Icon className="size-4" />
      <p className="truncate">{item.name}</p>
    </Button>
  );
};

export default FolderButton;
