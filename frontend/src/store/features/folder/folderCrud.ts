import { FolderItem } from "@/lib/features/types";

export function addFolderToTree(
  tree: FolderItem[],
  folder: FolderItem,
  parentId?: string,
): FolderItem[] {
  if (!parentId) return [...tree, folder];

  return tree.map((item) => {
    if (item.id === parentId) {
      return {
        ...item,
        children: [...(item.children || []), folder],
      };
    }

    if (item.children) {
      return {
        ...item,
        children: addFolderToTree(item.children, folder, parentId),
      };
    }

    return item;
  });
}

export function updateFolderInTree(
  tree: FolderItem[],
  folderId: string,
  data: Partial<FolderItem>,
): FolderItem[] {
  return tree.map((item) => {
    if (item.id === folderId) {
      return { ...item, ...data };
    }

    if (item.children) {
      return {
        ...item,
        children: updateFolderInTree(item.children, folderId, data),
      };
    }

    return item;
  });
}

export function deleteFolderFromTree(
  tree: FolderItem[],
  folderId: string,
): FolderItem[] {
  return tree
    .filter((item) => item.id !== folderId)
    .map((item) =>
      item.children
        ? { ...item, children: deleteFolderFromTree(item.children, folderId) }
        : item,
    );
}
