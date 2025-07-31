"use client";

import { EllipsisIcon, FolderPenIcon, Trash2Icon } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";

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

interface Props {
  type: FormType;
  id: string;
  value: string;
}

// Separate component for action buttons to prevent unnecessary re-renders
const ActionButton = memo(
  ({ action, onClick }: { action: ActionsProps; onClick: () => void }) => {
    return (
      <Button
        variant={"folder"}
        size={"lg"}
        className="gap-5"
        onClick={onClick}
      >
        <action.Icon className="size-5" />
        {action.title}
      </Button>
    );
  },
);

ActionButton.displayName = "ActionButton";

// Separate component for delete confirmation to prevent unnecessary re-renders
const DeleteConfirmation = memo(
  ({
    onCancel,
    onConfirm,
  }: {
    onCancel: () => void;
    onConfirm: () => void;
  }) => {
    return (
      <>
        <p className={"text-white"}>
          Tem certeza que quer continuar com essa ação?
        </p>
        <div className={"flex justify-end mt-4 gap-2"}>
          <Button variant={"ghost"} onClick={onCancel}>
            Voltar
          </Button>

          <Button onClick={onConfirm} className={"bg-red-600"}>
            Confirmar
          </Button>
        </div>
      </>
    );
  },
);

DeleteConfirmation.displayName = "DeleteConfirmation";

const FolderButtonEdit = ({ type, id, value }: Props) => {
  const [selectedType, setSelectedType] = useState<"edit" | "delete" | null>(
    null,
  );
  const [open, setOpen] = useState<boolean>(false);

  // Use the hook properly instead of getState
  const deleteFolder = useFolderStore((state) => state.deleteFolder);

  // Memoize actions array to prevent recreation on every render
  const actions = useMemo<ActionsProps[]>(
    () => [
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
    ],
    [],
  );

  // Memoize event handlers to prevent recreation on every render
  const handleDialogChange = useCallback((v: boolean) => {
    setOpen(v);
    if (!v) setSelectedType(null);
  }, []);

  const handleTriggerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  }, []);

  const handleActionSelect = useCallback((actionName: "edit" | "delete") => {
    setSelectedType(actionName);
  }, []);

  const handleDelete = useCallback(() => {
    deleteFolder(id);
    setOpen(false);
  }, [deleteFolder, id]);

  const handleFormClose = useCallback(() => {
    setOpen(false);
    setSelectedType(null);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setSelectedType(null);
  }, []);

  // Determine what content to show based on selectedType
  const dialogContent = useMemo(() => {
    if (!selectedType) {
      return actions.map((action) => (
        <ActionButton
          key={action.name}
          action={action}
          onClick={() => handleActionSelect(action.name)}
        />
      ));
    } else if (selectedType === "edit") {
      return (
        <DynamicForm
          type={type}
          action={selectedType}
          parentId={id}
          defaultValues={{ name: value }}
          onClose={handleFormClose}
        />
      );
    } else {
      return (
        <DeleteConfirmation
          onCancel={handleCancelDelete}
          onConfirm={handleDelete}
        />
      );
    }
  }, [
    selectedType,
    actions,
    handleActionSelect,
    type,
    id,
    value,
    handleFormClose,
    handleCancelDelete,
    handleDelete,
  ]);

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger onClick={handleTriggerClick}>
        <EllipsisIcon className="size-5 hover:text-white" />
      </DialogTrigger>

      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="text-white">
            {selectedType === "delete" ? "Deletar Pasta" : "Editar"}
          </DialogTitle>

          <DialogDescription className="relative flex flex-col mt-6 gap-2">
            {selectedType === "delete"
              ? "Essa ação não poderá ser desfeita"
              : "Editar Pasta"}
          </DialogDescription>
        </DialogHeader>

        {dialogContent}
      </DialogContent>
    </Dialog>
  );
};

export default memo(FolderButtonEdit);
