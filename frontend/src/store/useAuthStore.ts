"use client";

import { create } from "zustand";

import { loginUserByEmail, signupUserByEmail } from "@/lib/auth";

export interface userProps {
  name: string;
  email: string;
  password: string;
}

interface userAuth {
  userId: string;
  name: string;
}

interface AuthStore {
  authUser: userAuth;
}

interface AuthStoreActions {
  login: (user: userProps) => Promise<void>;
  register: (user: userProps) => Promise<void>;
  logout: () => void;
  setAuthUser: (user: userAuth) => void;
}

export const useAuthStore = create<AuthStore & AuthStoreActions>((set) => ({
  authUser: {
    userId: "",
    name: "",
  },

  login: async (data: userProps) => {
    const user = await loginUserByEmail(data);

    if (user) {
      set({ setAuthUser: user });
    }
  },

  register: async (data: userProps) => await signupUserByEmail(data),
  logout: () => set({ authUser: { userId: "", name: "" } }),
  setAuthUser: (user: userAuth) => set({ authUser: user }),
}));
