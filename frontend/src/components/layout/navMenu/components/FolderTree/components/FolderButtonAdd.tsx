"use client";

import { FileIcon, FolderIcon, PlusIcon, SquareKanbanIcon } from "lucide-react";
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
import { FormType } from "@/lib/forms";

interface ActionsProps {
  name: FormType;
  Icon: React.FC<React.ComponentProps<"svg">>;
  title: string;
}

const FolderButtonAdd = ({ parentId }: { parentId: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<FormType | null>(null);

  const actions: ActionsProps[] = [
    {
      name: "folder",
      Icon: FolderIcon,
      title: "Criar uma SubPasta",
    },
    { name: "note", Icon: FileIcon, title: "Criar uma Anotação" },
    { name: "kanban", Icon: SquareKanbanIcon, title: "Criar um Kanban" },
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setSelectedType(null);
      }}
    >
      <DialogTrigger
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <PlusIcon className="size-5 hover:text-white" />
      </DialogTrigger>

      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="text-white">Criar Item</DialogTitle>

          <DialogDescription className="relative flex flex-col mt-6 gap-2">
            Criar um {selectedType || "item"} dentro da pasta
          </DialogDescription>
        </DialogHeader>

        {selectedType ? (
          <DynamicForm
            type={selectedType}
            parentId={parentId}
            action={"create"}
            onClose={() => setOpen(false)}
          />
        ) : (
          actions.map((item) => (
            <Button
              key={item.name}
              variant={"folder"}
              size={"lg"}
              className="gap-5"
              onClick={() => setSelectedType(item.name)}
            >
              <item.Icon className="size-5" />
              {item.title}
            </Button>
          ))
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FolderButtonAdd;
