// src/app/(features)/folders/[slug]/page.tsx

import FolderTree from "@/app/(features)/folders/components/FolderTree";
import { getFolderBySlug } from "@/lib/folder";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// AQUI: params é um objeto normal, passado pelo Next.js
const FolderSlugPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const folder = await getFolderBySlug(decodeURIComponent(slug));

  return (
    <div className="w-full min-h-screen text-white">
      <FolderTree folders={folder?.children || []} />
    </div>
  );
};

export default FolderSlugPage;
