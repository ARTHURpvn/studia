import { toast } from "sonner";

import { noteFields } from "@/lib/features/annotations/fields";
import { NoteFormValues, noteSchema } from "@/lib/features/annotations/schema";
import { FolderItem } from "@/lib/features/types";
import { useFolderStore } from "@/store/features/folder/folderStore";

export const noteFormConfig = {
  schema: noteSchema,
  fields: noteFields,
  onSubmit: (
    data: NoteFormValues,
    action: "create" | "edit" | "delete",
    parentId?: string,
  ) => {
    const folder: Partial<FolderItem> = {
      name: data.name,
      type: "note",
      is_materia: false,
    };

    const { addFolder, updateFolder } = useFolderStore.getState();
    const title: string = {
      create: "Criada",
      edit: "Editada",
      delete: "Deletada",
    }[action];

    switch (action) {
      case "create":
        addFolder(folder, parentId);
        break;

      case "edit":
        updateFolder(parentId!, data);
        break;
    }

    toast.success(`Pasta ${title} com sucesso!`);
  },
};
