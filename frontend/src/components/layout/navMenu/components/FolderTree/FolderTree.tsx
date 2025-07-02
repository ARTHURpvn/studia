"use client";

import { useEffect, useState } from "react";

import { loadFoldersToStore } from "@/lib/folderData";
import { FolderItem, useFoldersStore } from "@/store/useFoldersStore";

import FolderNode from "./FolderNode";

const FolderTree = () => {
  useEffect(() => {
    loadFoldersToStore();
  }, []);

  const folders: FolderItem[] = useFoldersStore((s) => s.folders);
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
