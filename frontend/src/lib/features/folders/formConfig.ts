import { v4 as uuidv4 } from "uuid";

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
    const id: string = uuidv4();
    const folder: FolderItem = {
      ...data,
      id,
      type: "folder",
      children: [],
      isMateria: false,
    };

    const { addFolder, updateFolder } = useFolderStore.getState();

    switch (action) {
      case "create":
        addFolder(folder, parentId);
        break;

      case "edit":
        updateFolder(parentId!, data);
        break;
    }
  },
};
