import {
  ChevronDownIcon,
  ChevronUpIcon,
  FileIcon,
  FolderIcon,
  KanbanSquareIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { FolderItem } from "@/store/useFoldersStore";

interface FolderNodeProps {
  item: FolderItem;
  isRoot?: boolean;
  selectedPath?: string;
  onSelect?: (id: string) => void;
  currentPath?: string;
}

const FolderNode = ({
  item,
  isRoot = false,
  selectedPath = "",
  onSelect,
  currentPath = "",
}: FolderNodeProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const hasChildren = !!item.children?.length;
  const fullPath = currentPath ? `${currentPath}/${item.id}` : item.id;

  const isSelected = selectedPath === fullPath;
  const isChildSelected = selectedPath.startsWith(`${fullPath}/`);
  const Icon = {
    folder: FolderIcon,
    note: FileIcon,
    kanban: KanbanSquareIcon,
  }[item.type];

  const handleClick = () => {
    if (item.type === "folder") {
      setIsOpen((prev) => !prev);
    } else {
      onSelect?.(fullPath);
    }
  };

  const showChevron =
    item.type === "folder" ? (
      isOpen ? (
        <ChevronDownIcon />
      ) : (
        <ChevronUpIcon />
      )
    ) : null;

  return (
    <div className="flex flex-col">
      <Button
        onClick={handleClick}
        variant="folder"
        size="folder"
        className={`relative gap-[6px] text-md cursor-pointer z-1
          ${!isRoot ? "pl-4" : ""}
          ${
            !isRoot
              ? `before:absolute before:top-1/2 before:-left-4 before:w-4 before:border-t before:-z-1 
                 ${isSelected ? "before:border-white" : "before:border-neutral-700"}`
              : ""
          }
          ${isSelected ? "text-white font-semibold" : ""}
        `}
      >
        {showChevron}
        <Icon className="size-4" />
        <p className="truncate">{item.name}</p>
      </Button>

      {hasChildren && (
        <div
          className={`ml-2 pl-2 relative overflow-hidden transition-all duration-300
            ${isOpen ? "max-h-[1000px]" : "max-h-0"}
            before:absolute before:left-0 before:top-0 before:bottom-[18px] before:w-px
            ${!isRoot && isChildSelected ? "before:bg-white" : "before:bg-neutral-700"}
            
          `}
        >
          {isOpen &&
            item.children!.map((child) => (
              <FolderNode
                key={child.id}
                item={child}
                selectedPath={selectedPath}
                onSelect={onSelect}
                currentPath={fullPath}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default FolderNode;
