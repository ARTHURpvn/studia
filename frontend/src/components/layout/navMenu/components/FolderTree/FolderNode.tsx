import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo, useState } from "react";

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

// Separate component for rendering children to prevent unnecessary re-renders
const FolderNodeChildren = memo(
  ({
    children,
    isRoot,
    isRootSelected,
    isChildSelected,
    isOpen,
  }: {
    children: React.ReactNode;
    isRoot: boolean;
    isRootSelected: boolean;
    isChildSelected: boolean;
    isOpen: boolean;
  }) => {
    return (
      <FolderChildren
        isRoot={isRoot}
        isRootSelected={isRootSelected}
        isChildSelected={isChildSelected}
        isOpen={isOpen}
      >
        {children}
      </FolderChildren>
    );
  },
);

FolderNodeChildren.displayName = "FolderNodeChildren";

const FolderNode = ({
  item,
  isRoot = false,
  selectedPath = "",
  onSelect,
  currentPath = "",
}: FolderNodeProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  // Memoize these values to prevent recalculation on every render
  const { hasChildren, fullPath, isSelected, isChildSelected, isRootSelected } =
    useMemo(() => {
      const hasChildren = !!item.children?.length;
      const fullPath = currentPath ? `${currentPath}/${item.id}` : item.id;
      const isSelected = selectedPath === fullPath;
      const isChildSelected = selectedPath.startsWith(`${fullPath}/`);
      const isRootSelected =
        selectedPath.split("/").length === 2 &&
        selectedPath.startsWith(item.id);

      return {
        hasChildren,
        fullPath,
        isSelected,
        isChildSelected,
        isRootSelected,
      };
    }, [item.id, item.children, currentPath, selectedPath]);

  // Memoize the click handler to prevent recreation on every render
  const handleClick = useCallback(() => {
    if (item.type === "folder") {
      setIsOpen((prev) => !prev);
    } else {
      onSelect?.(fullPath);
      // Use router.push instead of direct window.location manipulation
      router.push(
        `/${item.type === "note" ? "annotation" : item.type}/${item.id}`,
      );
    }
  }, [item.type, item.id, fullPath, onSelect, router]);

  // Memoize the chevron icon to prevent recreation on every render
  const chevronIcon = useMemo(() => {
    if (item.type !== "folder" || !hasChildren) return null;
    return isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />;
  }, [item.type, hasChildren, isOpen]);

  return (
    <div className="flex flex-col">
      <FolderButton
        item={item}
        isRoot={isRoot}
        isSelected={isSelected}
        onClick={handleClick}
        showChevron={chevronIcon}
      />

      {hasChildren && (
        <FolderNodeChildren
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
        </FolderNodeChildren>
      )}
    </div>
  );
};

// Export a memoized version of the component to prevent unnecessary re-renders
export default memo(FolderNode);
