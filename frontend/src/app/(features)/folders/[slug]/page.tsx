import { use } from "react";

import FolderTree from "@/app/(features)/folders/components/FolderTree";
import { getFolderBySlug } from "@/lib/folder";

const FolderSlugPage = ({ params }: { params: { slug: string } }) => {
  const folder = use(getFolderBySlug(decodeURIComponent(params.slug)));

  return (
    <div className="w-full min-h-screen text-white">
      <FolderTree folders={folder?.children || []} />
    </div>
  );
};

export default FolderSlugPage;
