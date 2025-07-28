import { create } from "zustand";
import { persist } from "zustand/middleware";

import { FolderItem } from "@/lib/features/types";

import { folderStoreActions } from "./folderStoreActions";

interface FolderStore {
  folders: FolderItem[];
  setFolders: (folders: FolderItem[]) => void;
  addFolder: (folder: Partial<FolderItem>, parentId?: string) => void;
  updateFolder: (folderId: string, data: Partial<FolderItem>) => void;
  deleteFolder: (folderId: string) => void;
}

export const useFolderStore = create<FolderStore>()(
  persist(
    (set) => ({
      folders: [],
      setFolders: (folders: FolderItem[]) => set({ folders }),
      ...folderStoreActions(set),
    }),
    {
      name: "folder-store",
    },
  ),
);
