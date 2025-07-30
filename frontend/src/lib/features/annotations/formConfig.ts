import { toast } from "sonner";

import { noteFields } from "@/lib/features/annotations/fields";
import { NoteFormValues, noteSchema } from "@/lib/features/annotations/schema";
import { FolderItem } from "@/lib/features/types";
import { useNoteStore } from "@/store/features/annotations/noteStore";
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
    const { addAnnotation } = useNoteStore.getState();
    const title: string = {
      create: "Criada",
      edit: "Editada",
      delete: "Deletada",
    }[action];

    switch (action) {
      case "create":
        const res: string = addFolder(folder, parentId)!;
        const createNote = async () => {
          addAnnotation(await res);
        };
        createNote().then();
        break;

      case "edit":
        updateFolder(parentId!, data);
        break;
    }

    toast.success(`Pasta ${title} com sucesso!`);
  },
};
