import { FolderItem } from "@/lib/features/types";
import { useFolderStore } from "@/store/features/folder/folderStore";

import { folderFields } from "./fields";
import { FolderFormValues, folderSchema } from "./schema";

export const folderFormConfig = {
  schema: folderSchema,
  fields: folderFields,
  onSubmit: (
    data: FolderFormValues,
    action: "create" | "edit" | "delete",
    parentId?: string,
  ) => {
    const folder: Partial<FolderItem> = {
      name: data.name,
      type: "folder",
      is_materia: false,
    };

    const { addFolder, updateFolder } = useFolderStore.getState();

    switch (action) {
      case "create":
        addFolder(folder, parentId).then();
        break;

      case "edit":
        updateFolder(parentId!, data);
        break;
    }
  },
};
