import { Folder, PlusIcon } from "lucide-react";

import FolderNode from "@/app/(features)/folders/components/FolderNode";
import Header from "@/app/(features)/materias/[slug]/components/Header";
import MateriaInfos from "@/app/(features)/materias/[slug]/components/MateriaInfos";
import NavHeader from "@/app/(features)/materias/[slug]/components/NavHeader";
import HomeWorksInfos from "@/app/(features)/materias/components/HomeWorkInfos";
import { Button } from "@/components/ui/button";
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
    <div className={"flex flex-col w-full mx-4"}>
      <NavHeader />

      <div className="lg:w-2/3 w-full self-center mt-12 mx-4">
        <Header />
        <MateriaInfos />

        <HomeWorksInfos title={"Tarefas"} />

        <section
          className={
            "space-y-4 w-full lg:bg-[var(--second)] rounded-md lg:p-6 lg:mt-4 mt-10"
          }
        >
          <div className={"flex items-center gap-4 lg:gap-6 text-white"}>
            <Folder className={"lg:size-8 size-6"} />
            <h2 className={"text-2xl lg:text-4xl lg:font-bold"}>Vinculados</h2>
          </div>

          <div className={"flex items-center gap-4"}>
            <FolderNode item={item} />
            <Button size={"button"} className="flex flex-col gap-2">
              <PlusIcon className="size-7" />
              <p className={"text-lg"}>Criar</p>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MateriaSlugPage;
