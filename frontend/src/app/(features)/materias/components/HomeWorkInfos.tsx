"use client";

import { CircleCheckIcon, ClockAlertIcon, ScrollTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useWindowSize } from "@/hooks/useWindowSize";

interface HomeWorkInfosProps {
  title: string;
  quantity?: number;
}

const HomeWorksInfos = ({ title }: HomeWorkInfosProps) => {
  const device: "mobile" | "desktop" = useWindowSize();
  return (
    <section
      className={
        "w-full lg:bg-[var(--second)] lg:mt-4 h-fit lg:p-6 flex flex-col gap-4 mt-10 rounded-md"
      }
    >
      <div className={"text-white flex items-center gap-4 lg:gap-6 font-bold"}>
        <ClockAlertIcon className={"size-6 lg:size-8"} />
        <h2 className={"text-2xl lg:text-4xl"}>{title}</h2>
      </div>

      <Button asChild>
        <div
          className={
            "bg-transparent flex h-fit w-full justify-start hover:bg-[var(--second)] relative"
          }
        >
          <div
            className={
              "flex gap-4 justify-between items-center lg:w-2/3 lg:p-2"
            }
          >
            <div className={"flex w-3/5 flex-col gap-2"}>
              <div className={"flex items-center text-lg gap-4"}>
                <ScrollTextIcon className={"text-red-600"} />
                <p> Prova de Matemática </p>
              </div>

              <p className={"text-[var(--font)]"}>
                Essa Prova vai ser de inducao finita
              </p>
            </div>

            {device === "desktop" && (
              <div className={"flex w-2/5 justify-between items-center"}>
                <div className={"flex flex-col items-center gap-2"}>
                  <p className={"text-white text-lg"}>Nota</p>
                  <p className={"font-light text-[var(--font)]"}>6.0</p>
                </div>

                <div className={"flex flex-col items-center gap-2"}>
                  <p className={"text-white text-lg"}>Data</p>
                  <p className={"font-light text-[var(--font)]"}>16/06/2025</p>
                </div>
              </div>
            )}

            {device === "desktop" && (
              <div className={"absolute right-4 top-7.5"}>
                <CircleCheckIcon className={"size-6 text-[var(--font)]"} />
              </div>
            )}
          </div>
        </div>
      </Button>

      <Button variant={"ghost"} className={"self-end"}>
        Mostrar Mais
      </Button>
    </section>
  );
};

export default HomeWorksInfos;
