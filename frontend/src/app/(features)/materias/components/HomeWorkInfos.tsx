"use client";

import { ClockAlertIcon, ScrollTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface HomeWorkInfosProps {
  title: string;
  quantity?: number;
}

const HomeWorksInfos = ({ title }: HomeWorkInfosProps) => {
  return (
    <section className={"w-full h-fit flex flex-col gap-4"}>
      <div className={"text-white flex items-center gap-4 mt-10 font-bold"}>
        <ClockAlertIcon className={"size-6"} />
        <h2 className={"text-2xl"}>{title}</h2>
      </div>

      <Button asChild>
        <div
          className={
            "bg-transparent flex h-fit w-full items-start flex-col gap-2"
          }
        >
          <div className={"flex items-center text-lg gap-4"}>
            <ScrollTextIcon className={"text-red-600"} />
            <p> Prova de Matemática </p>
          </div>

          <p className={"text-[var(--font)]"}>
            Essa Prova vai ser de inducao finita
          </p>
        </div>
      </Button>

      <Button variant={"ghost"} className={"self-end"}>
        Mostrar Mais
      </Button>
    </section>
  );
};

export default HomeWorksInfos;
