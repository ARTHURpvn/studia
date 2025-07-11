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
    action: "create" | "edit",
    parentId?: string,
  ) => {
    const id: string = uuidv4();
    const folder: FolderItem = { ...data, id, type: "folder", children: [] };

    const { addFolder, updateFolder } = useFolderStore.getState();

    if (action === "create") {
      addFolder(folder, parentId);
    }

    if (action === "edit") {
      updateFolder(parentId!, data);
    }
  },
};
