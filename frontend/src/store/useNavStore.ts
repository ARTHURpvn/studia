import { create } from "zustand";

interface NavStore {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useNavStore = create<NavStore>((set) => ({
  activeSection: "dashboard",
  setActiveSection: (section: string) => set({ activeSection: section }),
}));
