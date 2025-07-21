import { v4 as uuidv4 } from "uuid";

import { FolderItem } from "@/lib/features/types";
import { useFolderStore } from "@/store/features/folder/folderStore";
import { Materias } from "@/store/features/materias/useMateriasStore";

export function addMateria(materias: Materias[], materia: Materias) {
  const { addFolder } = useFolderStore.getState();
  materias.push(materia);

  const id = uuidv4();

  const folder: FolderItem = {
    id,
    name: materia.name,
    type: "folder",
    isMateria: true,
  };

  addFolder(folder);

  return materias;
}

export function updateMateria(
  materias: Materias[],
  id: string,
  data: Partial<FolderItem>,
) {
  return materias.map((item) => {
    if (item.id === id) {
      return { ...item, ...data };
    }
    return item;
  });
}

export function deleteMateria(materias: Materias[], id: string) {
  return materias.filter((item) => item.id !== id);
}
