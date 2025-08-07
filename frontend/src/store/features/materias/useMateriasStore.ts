import { create } from "zustand";
import { persist } from "zustand/middleware";

import { materiasStoreActions } from "@/store/features/materias/useMateriasStoreActions";

export interface Materias {
  id?: string;
  name: string;
  teacher: string;
  semester: number;
  rating: number;
}

interface MateriasStore {
  materias: Materias[];
  isLoading: boolean;
  setMaterias: (materias: Materias[]) => void;
  fetchMaterias: () => Promise<void>;
  addMateria: (materia: Omit<Materias, "id">) => Promise<void>;
  updateMateria: (id: string, data: Partial<Materias>) => Promise<void>;
  deleteMateria: (id: string) => Promise<void>;
}

export const useMateriasStore = create<MateriasStore>()(
  persist(
    (set, get) => ({
      materias: [],
      isLoading: false,
      setMaterias: (materias) => set({ materias }),
      ...materiasStoreActions(set, get),
    }),
    {
      name: "materias-store",
    },
  ),
);
