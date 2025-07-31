import { toast } from "sonner";

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
      const res = await addFolderToTree(folder, parentId);
      if (!res) return;

      const folderId = res.folder_id;

      const data = await getRootFolders();
      set({ folders: data.folders });

      if (res.status_code >= 200 && res.status_code < 300) {
        toast.success(res.message);
        return folderId;
      }
      toast.error(res.message);
      return;
    } catch (err) {
      toast.error("");
      console.error("Erro ao adicionar pasta:", err);
    }
  },

  updateFolder: async (folderId: string, data: Partial<FolderItem>) => {
    try {
      const res = await updateFolderInTree(folderId, data);
      if (!res) return;

      const folders_data = await getRootFolders();

      set({ folders: folders_data.folders });

      if (res?.status_code >= 200 && res?.status_code < 300) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error("Erro durante updateFolder:", err);
      toast.error("Erro ao atualizar a pasta.");
    }
  },

  deleteFolder: async (folderId: string) => {
    const res = await deleteFolderFromTree(folderId);
    if (!res) return;

    const folders = await getRootFolders();
    set({ folders: folders.folders });

    if (res.status_code >= 200 && res.status_code < 300) {
      toast.success(res.message);
      return;
    }
    toast.error(res.message);
    return;
  },
});
