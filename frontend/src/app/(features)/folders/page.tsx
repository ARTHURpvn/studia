// ❌ sem "use client" aqui

import FolderTree from "@/app/(features)/folders/components/FolderTree";
import { getRootFolders } from "@/lib/folder";

const PastasPage = async () => {
  const folders = await getRootFolders();

  return (
    <div className="w-full min-h-screen text-white">
      <FolderTree folders={folders} />
    </div>
  );
};

export default PastasPage;
