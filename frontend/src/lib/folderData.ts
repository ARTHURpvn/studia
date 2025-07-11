import { FolderItem } from "@/lib/features/types";
import { getRootFolders } from "@/lib/folder";
import { useFolderStore } from "@/store/features/folder/folderStore";

export async function loadFoldersToStore() {
  const folders: FolderItem[] = await getRootFolders();
  const folderStore = localStorage.getItem("folder-store");
  if (!folderStore) useFolderStore.getState().setFolders(folders);
}
