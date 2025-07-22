import { Folder } from "lucide-react";

import FolderNode from "@/app/(features)/folders/components/FolderNode";
import ContainerInfos from "@/app/(features)/materias/components/ContainerInfos";
import HomeWorksInfos from "@/app/(features)/materias/components/HomeWorkInfos";
import { FolderItem } from "@/lib/features/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const MateriaSlugPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  console.log(slug);
  const item: Omit<FolderItem, "id"> = {
    name: "teste",
    type: "kanban",
  };

  return (
    <div className="w-full mt-12 mx-4">
      <h1 className={"text-3xl text-white"}>Matemática Discreta I</h1>

      <div className={"flex gap-4"}>
        <p className={"text-white"}>Professor:</p>
        <p className={"font-light"}> Arthur </p>
      </div>

      <section className={"flex justify-between mt-10"}>
        <ContainerInfos type={"homework"} />
        <ContainerInfos type={"finished"} />
      </section>

      <HomeWorksInfos title={"Tarefas"} />

      <section className={"space-y-4"}>
        <div className={"flex items-center gap-4 text-white mt-10"}>
          <Folder />
          <h2 className={"text-2xl"}> Vinculados </h2>
        </div>

        <FolderNode item={item} />
      </section>
    </div>
  );
};

export default MateriaSlugPage;
