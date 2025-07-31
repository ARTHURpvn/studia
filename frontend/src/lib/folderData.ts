import { FolderItem } from "@/lib/features/types";
import { getRootFolders } from "@/lib/folder";
import { useFolderStore } from "@/store/features/folder/folderStore";

export async function loadFoldersToStore() {
  const res = await getRootFolders();
  const folders: FolderItem[] = res.folders;

  console.log(folders);
  useFolderStore.getState().setFolders(folders);
}
