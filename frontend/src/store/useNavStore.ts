"use client";

import { create } from "zustand";

interface NavStore {
  activeSection: string;
  activePath: string[];
  setActiveSection: (section: string) => void;
  setActivePath: (path: string[]) => void;
}

export const useNavStore = create<NavStore>((set) => ({
  activeSection: "",
  activePath: [],
  setActiveSection: (section: string) => set({ activeSection: section }),
  setActivePath: (path: string[]) => set({ activePath: path }),
}));
