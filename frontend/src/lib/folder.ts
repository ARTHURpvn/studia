import { FolderItem } from "@/lib/features/types";

const foldersData: FolderItem[] = [
  {
    id: "1",
    name: "Pasta",
    type: "folder",
    children: [
      {
        id: "1-1",
        name: "subpasta",
        type: "folder",
        children: [
          {
            id: "1-1-1",
            name: "aaaaaaaaa",
            type: "folder",
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
  return new Promise((resolve) => setTimeout(() => resolve(foldersData), 100));
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
