"use client";

import FolderTree from "@/app/(features)/folders/components/FolderTree";
import { useFolderStore } from "@/store/features/folder/folderStore";

const PastasPage = () => {
  const folders = useFolderStore((s) => s.folders);

  return (
    <div className="w-full min-h-screen text-white">
      <FolderTree folders={folders} />
    </div>
  );
};

export default PastasPage;
