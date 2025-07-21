import { create } from "zustand";
import { persist } from "zustand/middleware";

import { materiasStoreActions } from "@/store/features/materias/useMateriasStoreActions";

export interface Materias {
  id: string;
  name: string;
  teacher: string;
  semester: number;
  rating: number;
}

interface MateriasStore {
  materias: Materias[];
  setMaterias: (materias: Materias[]) => void;
  addMateria: (materia: Materias) => void;
  updateMateria: (id: string, data: Partial<Materias>) => void;
  deleteMateria: (id: string) => void;
}

export const useMateriasStore = create<MateriasStore>()(
  persist(
    (set, get) => ({
      materias: [],
      setMaterias: (materias) => set({ materias }),
      ...materiasStoreActions(set, get),
    }),
    {
      name: "materias-store",
    },
  ),
);
