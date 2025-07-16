import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";

import FolderButton from "@/components/layout/navMenu/components/FolderTree/components/FolderButton";
import FolderChildren from "@/components/layout/navMenu/components/FolderTree/components/FolderChildren";
import { FolderItem } from "@/lib/features/types";

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
  const isRootSelected =
    selectedPath.split("/").length === 2 && selectedPath.startsWith(item.id);

  const handleClick = () => {
    if (item.type === "folder") {
      setIsOpen((prev) => !prev);
    } else {
      onSelect?.(fullPath);
    }
  };

  const chevronIcon = () => {
    if (item.type !== "folder" || !hasChildren) return null;
    return isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />;
  };

  return (
    <div className="flex flex-col">
      <FolderButton
        item={item}
        isRoot={isRoot}
        isSelected={isSelected}
        onClick={handleClick}
        showChevron={chevronIcon()}
      />

      {hasChildren && (
        <FolderChildren
          isRoot={isRoot}
          isRootSelected={isRootSelected}
          isChildSelected={isChildSelected}
          isOpen={isOpen}
        >
          {isOpen &&
            item.children!.map((child) => (
              <FolderNode
                key={child.id}
                item={child}
                isRoot={false}
                selectedPath={selectedPath}
                onSelect={onSelect}
                currentPath={fullPath}
              />
            ))}
        </FolderChildren>
      )}
    </div>
  );
};

export default FolderNode;
