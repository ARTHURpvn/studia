"use server";

import axios from "axios";
import { cookies } from "next/headers";

import { FolderItem } from "@/lib/features/types";
import { getRootFolders } from "@/lib/folder";
import { ResponseCreateFolder, ResponseType } from "@/lib/types";
import { useFolderStore } from "@/store/features/folder/folderStore";

// Funcao para criar uma nova pasta
export const addFolderToTree = async (
  folder: Partial<FolderItem>,
  parentId?: string,
): Promise<ResponseCreateFolder | undefined> => {
  folder["parent_id"] = parentId;

  const cookie = await cookies();
  const token = cookie.get("accessToken")?.value;
  if (!token) return;

  const { setFolders } = useFolderStore.getState();
  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

  try {
    const res = await axios.post(
      `${backend_host}/api/folders`,
      { ...folder },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await getRootFolders();

    setFolders(data.folders);
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
    throw err;
  }
};

// Funcao para atualizar pasta
export async function updateFolderInTree(
  folderId: string,
  data: Partial<FolderItem>,
): Promise<ResponseType | void> {
  const cookie = await cookies();
  const token = cookie.get("accessToken")?.value;
  if (!token) return;

  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

  try {
    return await axios
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
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
    throw err;
  }
}

// Funcao para deletar pasta
export async function deleteFolderFromTree(
  folderId: string,
): Promise<ResponseType | void> {
  const cookie = await cookies();
  const token = cookie.get("accessToken")?.value;
  if (!token) return;

  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

  try {
    return await axios
      .delete(`${backend_host}/api/folders/${folderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data;
      });
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
    throw err;
  }
}
