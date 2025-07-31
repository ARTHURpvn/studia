"use client";

import { memo, useCallback, useState } from "react";
import { useStore } from "zustand/react";

import { FolderItem } from "@/lib/features/types";
import { useFolderStore } from "@/store/features/folder/folderStore";

import FolderNode from "./FolderNode";

// Memoized FolderNode component to prevent unnecessary re-renders
const MemoizedFolderNode = memo(FolderNode);

const FolderTree = () => {
  // Use selector to only re-render when folders change
  const folders: FolderItem[] = useStore(useFolderStore, (s) => s.folders);
  const [selectedPath, setSelectedPath] = useState<string>("");

  // Memoize the onSelect callback to prevent unnecessary re-renders of child components
  const handleSelect = useCallback((path: string) => {
    setSelectedPath(path);
  }, []);

  return (
    <>
      {folders.map((item: FolderItem) => (
        <MemoizedFolderNode
          key={item.id}
          item={item}
          isRoot
          selectedPath={selectedPath}
          onSelect={handleSelect}
        />
      ))}
    </>
  );
};

// Export a memoized version of the component to prevent unnecessary re-renders
export default memo(FolderTree);
