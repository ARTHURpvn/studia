import { FolderItem } from "@/lib/features/types";
import { getRootFolders } from "@/lib/folder";

import {
  addFolderToTree,
  deleteFolderFromTree,
  updateFolderInTree,
} from "./folderCrud";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const folderStoreActions = (set: any) => ({
  addFolder: async (folder: Partial<FolderItem>, parentId?: string) => {
    try {
      const folderId = await addFolderToTree(folder, parentId);

      if (!folderId) {
        console.warn("Não foi possível criar a pasta.");
        return;
      }

      set({ folders: (await getRootFolders()) as FolderItem[] });
      return folderId;
    } catch (err) {
      console.error("Erro ao adicionar pasta:", err);
    }
  },

  updateFolder: (folderId: string, data: Partial<FolderItem>) => {
    updateFolderInTree(folderId, data).then(
      async () => {
        set({ folders: await getRootFolders() });
      },
      (error) => {
        console.log(error);
      },
    );
  },

  deleteFolder: async (folderId: string) => {
    deleteFolderFromTree(folderId).then(
      async () => {
        set({ folders: await getRootFolders() });
      },
      (error) => {
        console.log(error);
      },
    );
  },
});
