"use client";

import { BookTextIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useStore } from "zustand/react";

import AddMateriaButton from "@/app/(features)/materias/components/AddMateriaButton";
import ContainerInfos from "@/app/(features)/materias/components/ContainerInfos";
import InitialComponent from "@/app/(features)/materias/components/InitialComponent";
import SelectMateria from "@/app/(features)/materias/components/SelectMateria";
import { Button } from "@/components/ui/button";
import { useWindowSize } from "@/hooks/useWindowSize";
import {
  Materias,
  useMateriasStore,
} from "@/store/features/materias/useMateriasStore";

const MateriasPage = () => {
  const device: "mobile" | "desktop" = useWindowSize();
  const materias: Materias[] = useStore(useMateriasStore).materias;

  return (
    <main className="w-full h-full p-6">
      {device === "desktop" && (
        <header className={"flex gap-5 justify-end"}>
          <Button variant={"ghost"} className={"text-[var(--font)]"}>
            <PlusIcon />
            <p>Nova Tarefa</p>
          </Button>

          <AddMateriaButton device={device} />
        </header>
      )}

      {device === "mobile" ? (
        <section className={"flex flex-col justify-center mt-9 space-y-10"}>
          <div className="flex gap-5">
            <BookTextIcon className={"size-9"} strokeWidth={1.5} />
            <h1 className={"font-bold text-3xl"}>Matérias</h1>
          </div>

          {materias.length === 0 ? (
            <InitialComponent />
          ) : (
            materias.map((item: Materias) => (
              <Link href={`/materias/${item.id}`} key={item.id}>
                <SelectMateria data={item} />
              </Link>
            ))
          )}

          <span />

          <AddMateriaButton device={device} />
        </section>
      ) : (
        <section
          className={
            "flex flex-col gap-6 m-auto items-center w-2/3 mt-14 h-fit"
          }
        >
          <div className={"flex w-full items-center gap-6"}>
            <ContainerInfos type={"materias"} />
            <ContainerInfos type={"homework"} />
            <ContainerInfos type={"school_work"} />
            <ContainerInfos type={"exams"} />
            <ContainerInfos type={"finished"} />
          </div>

          <div
            className={
              "w-full flex flex-col bg-[var(--second)] py-6 px-8 rounded-md)]"
            }
          >
            <div className={"flex items-center gap-4 text-white"}>
              <BookTextIcon className={"size-8"} strokeWidth={1} />
              <p className={"text-3xl font-bold"}>Matérias</p>
            </div>

            {materias.length === 0 ? (
              <div
                className={
                  "flex flex-col gap-4 items-center mt-8 justify-center"
                }
              >
                <InitialComponent />
                <AddMateriaButton device={device} />
              </div>
            ) : (
              <div className={"grid grid-cols-3 self-center gap-7 mt-8 w-full"}>
                {materias.map((item: Materias) => (
                  <Link href={`/materias/${item.id}`} key={item.id}>
                    <SelectMateria data={item} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default MateriasPage;
