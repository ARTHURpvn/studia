import { FolderItem } from "@/lib/features/types";
import { getRootFolders } from "@/lib/folder";

import {
  addFolderToTree,
  deleteFolderFromTree,
  updateFolderInTree,
} from "./folderCrud";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const folderStoreActions = (set: any) => ({
  addFolder: (folder: FolderItem, parentId?: string) => {
    addFolderToTree(folder, parentId).then(
      async () => {
        set({ folders: (await getRootFolders()) as FolderItem[] });
      },
      (error) => {
        console.log(error);
      },
    );
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
