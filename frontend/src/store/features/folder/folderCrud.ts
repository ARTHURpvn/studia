"use server";

import axios from "axios";
import { cookies } from "next/headers";

import { FolderItem } from "@/lib/features/types";
import { getRootFolders } from "@/lib/folder";
import { useFolderStore } from "@/store/features/folder/folderStore";

// Funcao para criar uma nova pasta
export const addFolderToTree = async (
  folder: FolderItem,
  parentId?: string,
): Promise<void> => {
  folder["parent_id"] = parentId;
  const cookie = await cookies();
  const token = cookie.get("accessToken")?.value;
  if (!token) return;

  const { setFolders } = useFolderStore.getState();

  const res = await axios.post(
    "http://localhost:8000/api/folders",
    {
      ...folder,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log(res);
  setFolders(await getRootFolders());
};

export async function updateFolderInTree(
  folderId: string,
  data: Partial<FolderItem>,
): Promise<void> {
  const cookie = await cookies();
  const token = cookie.get("accessToken")?.value;
  if (!token) return;

  axios.patch(
    `http://localhost:8000/api/folders/${folderId}`,
    {
      ...data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export async function deleteFolderFromTree(folderId: string): Promise<void> {
  const cookie = await cookies();
  const token = cookie.get("accessToken")?.value;
  if (!token) return;

  axios.delete(`http://localhost:8000/api/folders/${folderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
