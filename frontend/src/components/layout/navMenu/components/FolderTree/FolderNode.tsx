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
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const hasChildren = !!item.children?.length;

  const fullPath = currentPath ? `${currentPath}/${item.id}` : item.id;
  const isSelected = selectedPath === fullPath;
  const isInPath = selectedPath.startsWith(fullPath);

  const handleClick = () => {
    if (item.type === "folder") {
      setIsOpen(!isOpen);
    } else {
      onSelect?.(fullPath);
    }
  };

  return (
    <div className="flex flex-col">
      <Button
        onClick={handleClick}
        variant="folder"
        size="folder"
        className={`relative flex items-center gap-[6px] text-md cursor-pointer
          ${!isRoot ? "pl-4" : ""}
          ${
            !isRoot
              ? `before:absolute before:top-1/2 before:-left-4 before:w-4 before:border-t 
              ${isInPath ? "before:border-white" : "before:border-neutral-700"}`
              : ""
          }
          ${isSelected && "text-white font-semibold"}
        `}
      >
        {item.type === "folder" ? (
          <div className="flex gap-2 items-center">
            {isOpen ? (
              <ChevronDownIcon className="size-4" />
            ) : (
              <ChevronUpIcon className="size-4" />
            )}
            <FolderIcon className="size-5" />
          </div>
        ) : item.type === "note" ? (
          <FileIcon className="size-5" />
        ) : (
          <KanbanSquareIcon className="size-5" />
        )}

        <p className="truncate">{item.name}</p>
      </Button>

      {hasChildren && (
        <div
          className={`ml-2 pl-2 relative overflow-hidden transition-all duration-300
            ${isOpen ? "max-h-[1000px]" : "max-h-0"}
            before:absolute before:left-0 before:top-0 before:bottom-[18px] before:w-px
            ${isInPath ? "before:bg-white" : "before:bg-neutral-700"}
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
