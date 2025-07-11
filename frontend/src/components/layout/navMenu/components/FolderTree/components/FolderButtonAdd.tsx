"use client";

import { FileIcon, FolderIcon, PlusIcon, SquareKanbanIcon } from "lucide-react";
import { useState } from "react";

import { DynamicForm } from "@/components/shared/DynamicForm"; // seu form builder
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
    <Dialog onOpenChange={() => setSelectedType(null)}>
      <DialogTrigger onClick={(e) => e.stopPropagation()}>
        <PlusIcon className="size-5 hover:text-white" />
      </DialogTrigger>

      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="text-white">
            Criar Item Dentro da Pasta
          </DialogTitle>

          <DialogDescription className="relative flex flex-col mt-6 gap-2">
            {actions.map((item) => (
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
            ))}
          </DialogDescription>
        </DialogHeader>

        {selectedType && (
          <DynamicForm type={selectedType} parentId={parentId} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FolderButtonAdd;
