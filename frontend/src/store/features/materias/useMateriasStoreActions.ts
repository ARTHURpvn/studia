import { toast } from "sonner";

import {
  createMateria,
  deleteMateria as deleteMateriaApi,
  getAllMaterias,
  updateMateria as updateMateriaApi,
} from "@/store/features/materias/materiasCrud";
import { Materias } from "@/store/features/materias/useMateriasStore";

export const materiasStoreActions = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set: any,
  get: () => { materias: Materias[] },
) => ({
  // Fetch all materias from the API
  fetchMaterias: async () => {
    try {
      set({ isLoading: true });
      const materias = await getAllMaterias();
      set({ materias, isLoading: false });
    } catch (error) {
      console.error("Error fetching materias:", error);
      toast.error("Erro ao carregar matérias");
      set({ isLoading: false });
    }
  },

  // Add a new materia
  addMateria: async (materia: Materias) => {
    try {
      set({ isLoading: true });
      const newMateria = await createMateria(materia);
      if (newMateria) {
        set({ materias: [...get().materias, newMateria], isLoading: false });
        toast.success("Matéria criada com sucesso");
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Error adding materia:", error);
      toast.error("Erro ao criar matéria");
      set({ isLoading: false });
    }
  },

  // Update an existing materia
  updateMateria: async (id: string, materia: Partial<Materias>) => {
    try {
      set({ isLoading: true });
      await updateMateriaApi(id, materia);

      // Update the local state
      const updatedMaterias = get().materias.map((item) => {
        if (item.id === id) {
          return { ...item, ...materia };
        }
        return item;
      });

      set({ materias: updatedMaterias, isLoading: false });
      toast.success("Matéria atualizada com sucesso");
    } catch (error) {
      console.error("Error updating materia:", error);
      toast.error("Erro ao atualizar matéria");
      set({ isLoading: false });
    }
  },

  // Delete a materia
  deleteMateria: async (id: string) => {
    try {
      set({ isLoading: true });
      await deleteMateriaApi(id);

      // Update the local state
      const updatedMaterias = get().materias.filter((item) => item.id !== id);
      set({ materias: updatedMaterias, isLoading: false });
      toast.success("Matéria excluída com sucesso");
    } catch (error) {
      console.error("Error deleting materia:", error);
      toast.error("Erro ao excluir matéria");
      set({ isLoading: false });
    }
  },
});
