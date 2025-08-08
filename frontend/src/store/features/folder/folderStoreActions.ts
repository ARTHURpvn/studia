import { toast } from "sonner";

import { FolderItem } from "@/lib/features/types";
import { getRootFolders } from "@/lib/folder";

import {
  addFolderToTree,
  deleteFolderFromTree,
  updateFolderInTree,
} from "./folderCrud";

// Helper function to update a folder in the tree
const updateFolderTreeState = (
  folders: FolderItem[],
  folderId: string,
  updater: (folder: FolderItem) => FolderItem,
): FolderItem[] => {
  return folders.map((folder) => {
    if (folder.id === folderId) {
      return updater(folder);
    }

    if (folder.children && folder.children.length > 0) {
      return {
        ...folder,
        children: updateFolderTreeState(folder.children, folderId, updater),
      };
    }

    return folder;
  });
};

// Helper function to add a folder to the tree
const addFolderToTreeState = (
  folders: FolderItem[],
  newFolder: FolderItem,
  parentId?: string,
): FolderItem[] => {
  if (!parentId) {
    return [...folders, newFolder];
  }

  return folders.map((folder) => {
    if (folder.id === parentId) {
      return {
        ...folder,
        children: folder.children
          ? [...folder.children, newFolder]
          : [newFolder],
      };
    }

    if (folder.children && folder.children.length > 0) {
      return {
        ...folder,
        children: addFolderToTreeState(folder.children, newFolder, parentId),
      };
    }

    return folder;
  });
};

// Helper function to delete a folder from the tree
const deleteFolderFromTreeState = (
  folders: FolderItem[],
  folderId: string,
): FolderItem[] => {
  return folders
    .filter((folder) => folder.id !== folderId)
    .map((folder) => {
      if (folder.children && folder.children.length > 0) {
        return {
          ...folder,
          children: deleteFolderFromTreeState(folder.children, folderId),
        };
      }
      return folder;
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const folderStoreActions = (set: any) => ({
  addFolder: async (folder: Partial<FolderItem>, parentId?: string) => {
    try {
      const res = await addFolderToTree(folder, parentId);
      if (!res) return;

      const folderId = res.folder_id;
      console.log(res);

      if (res.status_code >= 200 && res.status_code < 300) {
        // Get the complete folder data from the server
        const data = await getRootFolders();

        // Find the newly added folder in the response
        const findNewFolder = (
          folders: FolderItem[],
        ): FolderItem | undefined => {
          for (const f of folders) {
            if (f.id === folderId) return f;
            if (f.children) {
              const found = findNewFolder(f.children);
              if (found) return found;
            }
          }
          return undefined;
        };

        const newFolder = findNewFolder(data.folders);

        if (newFolder) {
          // Update only the affected part of the state
          set((state: { folders: FolderItem[] }) => ({
            folders: addFolderToTreeState(state.folders, newFolder, parentId),
          }));
        } else {
          // Fallback to full state update if we can't find the new folder
          set({ folders: data.folders });
        }

        toast.success(res.message);
        return folderId;
      }

      toast.error(res.message);
      return;
    } catch (err) {
      toast.error("Erro ao adicionar pasta");
      console.error("Erro ao adicionar pasta:", err);
    }
  },

  updateFolder: async (folderId: string, data: Partial<FolderItem>) => {
    try {
      const res = await updateFolderInTree(folderId, data);
      if (!res) return;

      if (res?.status_code >= 200 && res?.status_code < 300) {
        // Update only the affected folder in the state
        set((state: { folders: FolderItem[] }) => ({
          folders: updateFolderTreeState(state.folders, folderId, (folder) => ({
            ...folder,
            ...data,
          })),
        }));

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
    try {
      const res = await deleteFolderFromTree(folderId);
      if (!res) return;

      if (res.status_code >= 200 && res.status_code < 300) {
        // Remove the folder from the state
        set((state: { folders: FolderItem[] }) => ({
          folders: deleteFolderFromTreeState(state.folders, folderId),
        }));

        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error("Erro ao deletar pasta:", err);
      toast.error("Erro ao deletar a pasta.");
    }
  },
});
