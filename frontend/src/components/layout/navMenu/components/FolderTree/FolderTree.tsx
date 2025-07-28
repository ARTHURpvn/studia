"use client";

import { useState } from "react";
import { useStore } from "zustand/react";

import { FolderItem } from "@/lib/features/types";
import { useFolderStore } from "@/store/features/folder/folderStore";

import FolderNode from "./FolderNode";

const FolderTree = () => {
  const folders: FolderItem[] = useStore(useFolderStore, (s) => s.folders);
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
