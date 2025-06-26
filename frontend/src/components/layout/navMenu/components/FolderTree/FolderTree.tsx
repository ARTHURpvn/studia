"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { FolderItem } from "@/store/useFoldersStore";

import FolderNode from "./FolderNode";

interface Props {
  data: FolderItem[];
}

const FolderTree = ({ data }: Props) => {
  const [selectedPath, setSelectedPath] = useState<string>("");

  return (
    <>
      {data.map((item: FolderItem) => (
        <FolderNode
          key={item.id}
          item={item}
          isRoot
          selectedPath={selectedPath}
          onSelect={setSelectedPath}
        />
      ))}

      <div className="flex w-full py-2 px-3 cursor-pointer hover:bg-[var(--second)] hover:text-white rounded-md  items-center gap-3 mt-4">
        <PlusIcon />
        <p>Criar Pasta</p>
      </div>
    </>
  );
};

export default FolderTree;
