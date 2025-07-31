"use server";

import axios from "axios";
import { cookies } from "next/headers";

import { FolderItem } from "@/lib/features/types";
import { ResponseGetFolder } from "@/lib/types";

export async function getRootFolders(): Promise<ResponseGetFolder> {
  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;
  const cookie = await cookies();
  const token = cookie.get("accessToken");
  const response = await axios.get(`${backend_host}/api/folders`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  return response.data;
}

export async function getFolderBySlug(
  slug: string,
): Promise<FolderItem | null> {
  const res = await getRootFolders();
  const foldersData = res.folders;
  const findByName = (name: string, items: FolderItem[]): FolderItem | null => {
    for (const item of items) {
      if (item.name === name) return item;
      if (item.children) {
        const found = findByName(name, item.children);
        if (found) return found;
      }
    }
    return null;
  };

  return new Promise((resolve) =>
    setTimeout(() => resolve(findByName(slug, foldersData))),
  );
}
