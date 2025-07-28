import { FolderItem } from "@/lib/features/types";
import { getRootFolders } from "@/lib/folder";
import { useFolderStore } from "@/store/features/folder/folderStore";

export async function loadFoldersToStore() {
  const folders: FolderItem[] = await getRootFolders();
  console.log(folders);
  useFolderStore.getState().setFolders(folders);
}
