import { use } from "react";

import FolderTree from "@/app/(features)/folders/components/FolderTree";
import { getRootFolders } from "@/lib/folder";
import { useFoldersStore } from "@/store/useFoldersStore";

const PastasPage = () => {
  const folders = use(getRootFolders());
  useFoldersStore((s) => s.setFolders(folders));

  return (
    <div className="w-full min-h-screen  text-white">
      <FolderTree folders={folders} />
    </div>
  );
};

export default PastasPage;
