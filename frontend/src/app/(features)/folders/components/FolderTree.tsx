"use client";

import { FolderItem } from "@/store/useFoldersStore";

import FolderNode from "./FolderNode";

const FolderTree = ({ folders }: { folders: FolderItem[] }) => {
  return (
    <div className="w-screen px-6 my-10 flex gap-4">
      {folders.map((item) => (
        <FolderNode key={item.id} item={item} />
      ))}
    </div>
  );
};

export default FolderTree;
