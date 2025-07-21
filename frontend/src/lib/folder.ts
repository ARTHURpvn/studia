import axios from "axios";

import { FolderItem } from "@/lib/features/types";

const foldersData: FolderItem[] = [
  {
    id: "1",
    name: "Pasta",
    type: "folder",
    isMateria: false,
    children: [
      {
        id: "1-1",
        name: "subpasta",
        type: "folder",
        isMateria: false,
        children: [
          {
            id: "1-1-1",
            name: "aaaaaaaaa",
            type: "folder",
            isMateria: false,
            children: [
              {
                id: "1-1-1-1",
                name: "Anotation",
                type: "note",
              },
            ],
          },
          {
            id: "1-1-2",
            name: "Anotation",
            type: "note",
          },
        ],
      },
      {
        id: "1-2",
        name: "Kanban",
        type: "kanban",
      },
    ],
  },
];

export async function getRootFolders(): Promise<FolderItem[]> {
  const response = await axios.get("http://localhost:8000/api/folders");
  console.log(response.data);
  return response.data;
}

export async function getFolderBySlug(
  slug: string,
): Promise<FolderItem | null> {
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
