"use client";

import { useEffect, useState } from "react";

import { FolderItem } from "@/lib/features/types";
import { loadFoldersToStore } from "@/lib/folderData";
import { useFolderStore } from "@/store/features/folder/folderStore";

import FolderNode from "./FolderNode";

const FolderTree = () => {
  useEffect(() => {
    loadFoldersToStore();
  }, []);

  const folders: FolderItem[] = useFolderStore((s) => s.folders);
  const [selectedPath, setSelectedPath] = useState<string>("");

  return (
    <>
      {folders.map((item: FolderItem) => (
        <FolderNode
          key={item.id}
          item={item}
          isRoot
          selectedPath={selectedPath}
          onSelect={setSelectedPath}
        />
      ))}
    </>
  );
};

export default FolderTree;
