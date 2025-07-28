"use server";

import axios from "axios";
import { cookies } from "next/headers";

import { FolderItem } from "@/lib/features/types";

export async function getRootFolders(): Promise<FolderItem[]> {
  const cookie = await cookies();
  const token = cookie.get("accessToken");
  const response = await axios.get("http://localhost:8000/api/folders", {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  return response.data;
}

export async function getFolderBySlug(
  slug: string,
): Promise<FolderItem | null> {
  const foldersData = await getRootFolders();
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
