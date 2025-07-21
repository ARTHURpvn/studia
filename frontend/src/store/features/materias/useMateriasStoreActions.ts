import {
  addMateria,
  deleteMateria,
  updateMateria,
} from "@/store/features/materias/useMateriasCrud";
import { Materias } from "@/store/features/materias/useMateriasStore";

export const materiasStoreActions = (
  set,
  get: () => { materias: Materias[] },
) => ({
  addMateria: (materia: Materias) => {
    const updated = addMateria(get().materias, materia);
    set({ materias: updated });
  },
  updateMateria: (id: string, materia: Partial<Materias>) => {
    const updated = updateMateria(get().materias, id, materia);
    set({ materias: updated });
  },
  deleteMateria: (id: string) => {
    const updated = deleteMateria(get().materias, id);
    set({ materias: updated });
  },
});
