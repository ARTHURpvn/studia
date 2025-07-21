"use client";

import { BookTextIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import InitialComponent from "@/app/(features)/materias/components/InitialComponent";
import SelectMateria from "@/app/(features)/materias/components/SelectMateria";
import { DynamicForm } from "@/components/shared/DynamicForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWindowSize } from "@/hooks/useWindowSize";
import {
  Materias,
  useMateriasStore,
} from "@/store/features/materias/useMateriasStore";

const MateriasPage = () => {
  const device: "mobile" | "desktop" = useWindowSize();
  const materias = useMateriasStore((s) => s.materias);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <main className="w-full h-full p-6">
      <header className={"lg:flex lg:gap-5 lg:justify-end"}>
        {device === "desktop" && (
          <>
            <Button variant={"ghost"} className={"text-[var(--font)]"}>
              <PlusIcon />
              <p>Nova Tarefa</p>
            </Button>

            <Button>
              <PlusIcon />
              <p>Nova Materia</p>
            </Button>
          </>
        )}
      </header>

      <section className={"flex flex-col justify-center mt-9 space-y-10"}>
        <div className="flex gap-5">
          <BookTextIcon className={"size-9"} strokeWidth={1.5} />
          <h1 className={"font-bold text-3xl"}>Matérias</h1>
        </div>

        {materias.length === 0 ? (
          <InitialComponent />
        ) : (
          materias.map((item: Materias) => (
            <Link href={""} key={item.id}>
              <SelectMateria data={item} />
            </Link>
          ))
        )}

        <span />

        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <DialogTrigger asChild>
            <Button
              size={"phone"}
              className={"bg-[var(--tag-orange)]"}
              onClick={() => setIsOpen(true)}
            >
              <PlusIcon />
              Adicionar Matéria
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Materia</DialogTitle>
              <DialogDescription>Criar uma Matéria</DialogDescription>
            </DialogHeader>

            <DynamicForm
              type={"materia"}
              action={"create"}
              onClose={() => setIsOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </section>
    </main>
  );
};

export default MateriasPage;
