import { FolderItem } from "@/lib/features/types";

export interface ResponseType {
  message: string;
  status_code: number;
  error?: string;
}

export interface ResponseGetFolder {
  folders: FolderItem[];
}

export interface ResponseCreateFolder extends ResponseType {
  folder_id: string;
}
