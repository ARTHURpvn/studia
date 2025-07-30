"use server";

import axios from "axios";
import { cookies } from "next/headers";

import { FolderItem } from "@/lib/features/types";
import { getRootFolders } from "@/lib/folder";
import { useFolderStore } from "@/store/features/folder/folderStore";

// Funcao para criar uma nova pasta
export const addFolderToTree = async (
  folder: Partial<FolderItem>,
  parentId?: string,
): Promise<string | undefined> => {
  folder["parent_id"] = parentId;

  const cookie = await cookies();
  const token = cookie.get("accessToken")?.value;
  if (!token) return;

  const { setFolders } = useFolderStore.getState();
  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

  const res = await axios.post(
    `${backend_host}/api/folders`,
    { ...folder },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  setFolders(await getRootFolders());
  return res.data.folder_id;
};

export async function updateFolderInTree(
  folderId: string,
  data: Partial<FolderItem>,
): Promise<void> {
  const cookie = await cookies();
  const token = cookie.get("accessToken")?.value;
  if (!token) return;

  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

  axios
    .patch(
      `${backend_host}/api/folders/${folderId}`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then();
}

export async function deleteFolderFromTree(folderId: string): Promise<void> {
  const cookie = await cookies();
  const token = cookie.get("accessToken")?.value;
  if (!token) return;

  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

  axios
    .delete(`${backend_host}/api/folders/${folderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then();
}
