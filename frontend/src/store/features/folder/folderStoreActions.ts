import { FolderItem } from "@/lib/features/types";

import {
  addFolderToTree,
  deleteFolderFromTree,
  updateFolderInTree,
} from "./folderCrud";

export const folderStoreActions = (
  set,
  get: () => { folders: FolderItem[] },
) => ({
  addFolder: (folder: FolderItem, parentId?: string) => {
    const updated = addFolderToTree(get().folders, folder, parentId);
    set({ folders: updated });
  },

  updateFolder: (folderId: string, data: Partial<FolderItem>) => {
    const updated = updateFolderInTree(get().folders, folderId, data);
    set({ folders: updated });
  },

  deleteFolder: (folderId: string) => {
    const updated = deleteFolderFromTree(get().folders, folderId);
    set({ folders: updated });
  },
});
