"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";

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

const AddMateriaButton = ({ type }: { type: "materia" | "homework" }) => {
  const device: "mobile" | "desktop" = useWindowSize();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const title = {
    materia: "Matéria",
    homework: "Tarefa",
  }[type];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button
          size={device == "mobile" ? "phone" : "default"}
          className={device == "mobile" ? "bg-[var(--tag-orange)]" : ""}
          onClick={() => setIsOpen(true)}
        >
          <PlusIcon />
          Adicionar {title}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Materia</DialogTitle>
          <DialogDescription>Criar uma Matéria</DialogDescription>
        </DialogHeader>

        <DynamicForm
          type={type}
          action={"create"}
          onClose={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddMateriaButton;
