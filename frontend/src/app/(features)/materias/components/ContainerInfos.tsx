"use client";

import {
  BookOpenTextIcon,
  BookTextIcon,
  CircleCheckIcon,
  NotebookTabsIcon,
  ScrollTextIcon,
} from "lucide-react";

interface infosProps {
  type: "materias" | "homework" | "school_work" | "exams" | "finished";
}

const ContainerInfos = ({ type }: infosProps) => {
  const Icon = {
    materias: BookTextIcon,
    homework: BookOpenTextIcon,
    school_work: NotebookTabsIcon,
    exams: ScrollTextIcon,
    finished: CircleCheckIcon,
  }[type];

  const title = {
    materias: "Matérias",
    homework: "Tarefas",
    school_work: "Trabalhos",
    exams: "Provas",
    finished: "Concluídos",
  };

  return (
    <div
      className={
        "w-48 h-23 bg-[var(--second)] flex flex-col px-5 py-2 gap-3 rounded-md"
      }
    >
      <p className={"text-white"}>{title[type]}</p>
      <div className={"flex justify-between"}>
        <p className={"text-white text-3xl"}>0</p>
        <Icon className={"size-8"} />
      </div>
    </div>
  );
};

export default ContainerInfos;
