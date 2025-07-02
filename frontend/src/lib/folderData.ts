import { getRootFolders } from "@/lib/folder";
import { FolderItem, useFoldersStore } from "@/store/useFoldersStore";

export async function loadFoldersToStore() {
  const folders: FolderItem[] = await getRootFolders();
  useFoldersStore.getState().setFolders(folders);
}
