"use client";

import { EllipsisIcon, FolderPenIcon, Trash2Icon } from "lucide-react";
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
import { useFolderStore } from "@/store/features/folder/folderStore";

interface ActionsProps {
  title: string;
  name: "edit" | "delete";
  Icon: React.FC<React.ComponentProps<"svg">>;
}

const FolderButtonEdit = ({
  type,
  id,
  value,
}: {
  type: FormType;
  id: string;
  value: string;
}) => {
  const [selectedType, setSelectedType] = useState<"edit" | "delete" | null>(
    null,
  );
  const [open, setOpen] = useState<boolean>(false);

  const { deleteFolder } = useFolderStore.getState();

  const actions: ActionsProps[] = [
    {
      title: "Renomear",
      name: "edit",
      Icon: FolderPenIcon,
    },

    {
      title: "Excluir",
      name: "delete",
      Icon: Trash2Icon,
    },
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
        <EllipsisIcon className="size-5 hover:text-white" />
      </DialogTrigger>

      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="text-white">
            {selectedType === "delete" ? "Deletar Pasta" : "Editar"}
          </DialogTitle>

          <DialogDescription className="relative flex flex-col mt-6 gap-2">
            <p>
              {selectedType === "delete"
                ? "Tem certeza que deseja Deletar essa pasta e seus filhos?"
                : "Editar Pasta"}
            </p>
          </DialogDescription>
        </DialogHeader>

        {!selectedType ? (
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
        ) : selectedType === "edit" ? (
          <DynamicForm
            type={type}
            action={selectedType}
            parentId={id}
            defaultValue={{ name: value }}
            onClose={() => setOpen(false)}
          />
        ) : (
          <div className={"flex justify-end mt-4"}>
            <Button variant={"ghost"} onClick={() => setSelectedType(null)}>
              Voltar
            </Button>

            <Button onClick={() => deleteFolder(id)}>Confirmar</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FolderButtonEdit;
