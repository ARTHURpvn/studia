import { create } from "zustand";

type FormData = Record<string, unknown>;

interface FormStore {
  formData: FormData;
  setFormData: (data: FormData) => void;
  clearFormData: () => void;
}

export const useFormStore = create<FormStore>((set) => ({
  formData: {},
  setFormData: (data) => set({ formData: data }),
  clearFormData: () => set({ formData: {} }),
}));
