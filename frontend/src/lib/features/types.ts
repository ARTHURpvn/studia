export type ItemType = "folder" | "note" | "kanban";

export interface FolderItem {
  id: string;
  name: string;
  type: ItemType;
  isMateria?: boolean;
  children?: FolderItem[];
}
