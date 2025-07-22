"use client";

import ContainerInfos from "@/app/(features)/materias/components/ContainerInfos";
import { useWindowSize } from "@/hooks/useWindowSize";

const MateriaInfos = () => {
  const device: "mobile" | "desktop" = useWindowSize();
  return (
    <section className={"flex justify-between mt-4"}>
      <ContainerInfos type={"homework"} />
      {device === "desktop" && (
        <>
          <ContainerInfos type={"school_work"} />
          <ContainerInfos type={"exams"} />
          <ContainerInfos type={"finished"} />
        </>
      )}
      <ContainerInfos type={"rating"} />
    </section>
  );
};

export default MateriaInfos;
