import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// AQUI: params é um objeto normal, passado pelo Next.js
const FolderSlugPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  return <SimpleEditor folder_id={slug} />;
};

export default FolderSlugPage;
