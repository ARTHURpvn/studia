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
    console.log(parentId, " parentId");

    switch (action) {
      case "create":
        addFolder(folder, parentId).then((res) => addAnnotation(res!));
        break;

      case "edit":
        updateFolder(parentId!, data);
        break;
    }
  },
};
