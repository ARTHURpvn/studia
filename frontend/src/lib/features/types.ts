export type ItemType = "folder" | "note" | "kanban";

export interface FolderItem {
  id: string;
  name: string;
  type: ItemType;
  is_materia?: boolean;
  parent_id?: string;
  children?: FolderItem[];
}
