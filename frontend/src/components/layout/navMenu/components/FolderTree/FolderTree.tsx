"use client";

import { useEffect, useState } from "react";

import { loadFoldersToStore } from "@/lib/folderData";
import { FolderItem, useFoldersStore } from "@/store/useFoldersStore";

import FolderNode from "./FolderNode";

const FolderTree = () => {
  const folders = useFoldersStore((s) => s.folders);
  const [selectedPath, setSelectedPath] = useState<string>("");

  useEffect(() => {
    if (folders.length === 0) {
      loadFoldersToStore();
    }
  }, [folders.length]);

  return (
    <>
      {folders.map((item: FolderItem) => (
        <FolderNode
          key={item.id}
          item={item}
          isRoot
          selectedPath={selectedPath}
          onSelect={setSelectedPath}
          currentPath=""
        />
      ))}
    </>
  );
};

export default FolderTree;
