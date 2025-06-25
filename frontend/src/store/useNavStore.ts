import { create } from "zustand";

interface NavStore {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useNavStore = create<NavStore>((set) => ({
  activeSection: "",
  setActiveSection: (section: string) => set({ activeSection: section }),
}));
