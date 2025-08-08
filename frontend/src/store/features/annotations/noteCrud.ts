import { JSONContent } from "@tiptap/core";
import axios from "axios";

import getCookie from "@/lib/getCookie";

// Funcao para criar uma nova pasta
export const createNote = async (parent_id: string): Promise<void> => {
  const token = await getCookie("accessToken").then();
  if (!token) return;

  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;
  console.log(parent_id);
  const res = await axios.post(
    `${backend_host}/api/annotations/${parent_id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log(res);
};

export async function updateNote(
  folderId: string,
  data: JSONContent,
): Promise<void> {
  const token = await getCookie("accessToken").then();
  if (!token) return;

  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

  axios
    .patch(
      `${backend_host}/api/annotations/${folderId}`,
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

export async function deleteNote(folderId: string): Promise<void> {
  const token = await getCookie("accessToken").then();
  if (!token) return;

  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

  try {
    axios
      .delete(`${backend_host}/api/annotations/${folderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then();
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
    throw err;
  }
}

export async function readNote(folderId: string): Promise<JSONContent> {
  const token = await getCookie("accessToken").then();

  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

  try {
    const res = await axios.get(`${backend_host}/api/annotations/${folderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
    throw err;
  }
}
