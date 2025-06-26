import { use } from "react";

import FolderTree from "@/app/(features)/folders/components/FolderTree";
import { getRootFolders } from "@/lib/folder";

const PastasPage = () => {
  const folders = use(getRootFolders());

  return (
    <div className="w-full min-h-screen  text-white">
      <FolderTree folders={folders} />
    </div>
  );
};

export default PastasPage;
