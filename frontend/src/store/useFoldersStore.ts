"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ItemType = "folder" | "note" | "kanban";

export interface FolderItem {
  id: string;
  name: string;
  type: ItemType;
  children?: FolderItem[];
}

interface FolderStore {
  folders: FolderItem[];
  setFolders: (folders: FolderItem[]) => void;
}

export const useFoldersStore = create<FolderStore>()(
  persist(
    (set) => ({
      folders: [],
      setFolders: (folders: FolderItem[]) => set({ folders }),
    }),
    {
      name: "folders-store",
    },
  ),
);
